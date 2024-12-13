import { WebSocket } from 'ws';

export type Room = {
    users: WebSocket[];
};

export type Rooms = {
    [key: string]: Room;
};

export type Message = {
    type: string;
    room?: string;
    text?: string;
};
