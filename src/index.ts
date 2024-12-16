import { WebSocketServer, WebSocket } from 'ws';
import { createRoom, joinRoom, leaveRoom, listRooms } from '../lib/room';
import { broadcast } from '../lib/chat';
import { Rooms } from '../lib/types';

const server = new WebSocketServer({ port: 8080 });
const rooms: Rooms = {};

let usercount = 0;


server.on('connection', (ws: WebSocket) => {

    usercount++;
    console.log("User connected "+ usercount);
    
    let currentRoom: string | null = null;

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
                case 'leave_room': {
                    if (currentRoom) {
                        leaveRoom(currentRoom, ws, rooms);
                        broadcast(currentRoom, { message: 'A user has left the room.' }, rooms);
                        currentRoom = null;
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
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON format.' }));
        }
    });

    ws.on('close', () => {
        if (currentRoom) {
            leaveRoom(currentRoom, ws, rooms);
            broadcast(currentRoom, { message: 'A user has disconnected.' }, rooms);
        }
        usercount--;
        console.log("User disconnected " + usercount);
    });
});

console.log('WebSocket server running on ws://localhost:8080');