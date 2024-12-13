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
├── src
│   ├── index.ts      # Main ts file for WebSocket server
├── package.json      # Node.js project file
├── tsconfig.json     # TypeScript configuration
└── README.md         # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo_url>
   cd relay-chat-be
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

### Testing:

To test the updated functionality, you can use a Postman and use the Websocket server instance. These are the messages to check the functionality:

1. **Create Room**:
   Send a message with `type: "create_room"`:

   ```json
   { "type": "create_room" }
   ```

   Response:
   ```json
   { "type": "room_created",
     "room": "ABC123"
   }
   ```

2. **Join Room**:
   Use the generated room code in the `join_room` request:
   ```json
   { "type": "join_room",
     "room": "ABC123" 
   }
   ```

3. **List Rooms**:
   ```json
   { "type": "list_rooms" }
   ```

   Response:
   ```json
   { "type": "room_list",
     "rooms": [{ "room": "ABC123", "userCount": 1 }]
   }
   ```

4. **Message**:
   Send a message with `type: "message"` to broadcast to all users in the room:
   ```json
   { "type": "message",
     "text": "Hello, everyone!"
   }
   ```