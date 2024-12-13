import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error',function(err){
    console.log('Error: ',err);
  });

  ws.on('message', incoming);
  function incoming(message: string): void {
    console.log('received: %s', message);
  }
  ws.send('Hello! Message From Server!!');
  
});