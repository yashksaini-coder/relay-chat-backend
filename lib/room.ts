import { WebSocket } from 'ws';
import { generateRoomCode } from './utils';
import { Rooms } from './types';

export function createRoom(rooms: Rooms): string {
    let room = generateRoomCode();
    while (rooms[room]) {
        room = generateRoomCode();
    }
    rooms[room] = { users: [] };
    return room;
}

export function joinRoom(room: string, ws: WebSocket, rooms: Rooms): string | null {
    if (rooms[room]) {
        rooms[room].users.push(ws);
        return room;
    }
    return null;
}

export function leaveRoom(room: string, ws: WebSocket, rooms: Rooms): void {
    if (rooms[room]) {
        rooms[room].users = rooms[room].users.filter(user => user !== ws);
        if (rooms[room].users.length === 0) {
            delete rooms[room];
        }
    }
}

export function listRooms(rooms: Rooms): { room: string; userCount: number }[] {
    return Object.entries(rooms).map(([name, { users }]) => ({
        room: name,
        userCount: users.length,
    }));
}