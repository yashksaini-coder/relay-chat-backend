import { WebSocketServer, WebSocket } from 'ws';
import { createRoom, joinRoom, leaveRoom, listRooms } from '../lib/room';
import { broadcast } from '../lib/chat';
import { Rooms } from '../lib/types';

const server = new WebSocketServer({ port: 8080 });
const rooms: Rooms = {};

server.on('connection', (ws: WebSocket) => {
    let currentRoom: string | null;

    ws.on('message', (data: string) => {
        try {
            const message = JSON.parse(data);

            switch (message.type) {
                case 'create_room': {
                    const room = createRoom(rooms);
                    ws.send(JSON.stringify({ type: 'room_created', room }));
                    break;
                }
                case 'join_room': {
                    const { room } = message;
                    if (joinRoom(room, ws, rooms)) {
                        currentRoom = room;
                        broadcast(room, { message: 'A user has joined the room.' }, rooms);
                    } else {
                        ws.send(JSON.stringify({ type: 'error', message: 'Room does not exist.' }));
                    }
                    break;
                } 
                case 'list_rooms': {
                    ws.send(JSON.stringify({ type: 'room_list', rooms: listRooms(rooms) }));
                    break;
                }
                case 'message': {
                    if (currentRoom) {
                        broadcast(currentRoom, { message: message.text }, rooms);
                    } else {
                        ws.send(JSON.stringify({ type: 'error', message: 'You are not in a room.' }));
                    }
                    break;
                }
                default: {
                    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message type.' }));
                }
            }
        } catch (err) {
            ws.send(JSON.stringify({ type: 'error', message: console.error(err)
            }));
        }
    });

    ws.on('close', () => {
        if (currentRoom) {
            leaveRoom(currentRoom, ws, rooms);
        }
    });
});

console.log('WebSocket server running on ws://localhost:8080');