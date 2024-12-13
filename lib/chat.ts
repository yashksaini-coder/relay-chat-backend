import { WebSocket } from 'ws';
import { Rooms } from './types';

export function broadcast(room: string, message: object, rooms: Rooms): void {
    if (rooms[room]) {
        rooms[room].users.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }
}