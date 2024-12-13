# WebSocket Chat Application

A simple WebSocket-based chat application where users can create, join, and chat in rooms.

## Features include:-

- Create a room ID with a unique 6-character code.
- Join existing chat rooms.
- List active rooms with the number of users.
- Real-time chat functionality (message polling).

## Project Structure

``` markdown
.
├── lib
│   ├── utils.ts      # Utility functions like generateRoomCode
│   ├── room.ts       # Room-related logic
│   ├── chat.ts       # Chat-related logic
├── server.ts         # Main entry file for WebSocket server
├── package.json      # Node.js project file
├── tsconfig.json     # TypeScript configuration
└── README.md         # Project documentation
```