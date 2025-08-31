import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;


  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // connect to the room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    console.log(`Client ${client.id} joined room ${room}`);
    this.server.to(room).emit('systemMessage', `User ${client.id} joined room ${room}`);
  }

  // Exit from the room
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(room);
    console.log(`Client ${client.id} left room ${room}`);
    this.server.to(room).emit('systemMessage', `User ${client.id} left room ${room}`);
  }

  //Sending a message to the room
  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() payload: { room: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Message in ${payload.room}:`, payload.message);

    this.server.to(payload.room).emit('newMessage', {
      user: client.id,
      text: payload.message,
    });
  }

  // @SubscribeMessage('clearRoom')
  // handleMessage() {

  // }
}