import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class NotificationsGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer() server: Server;

  @SubscribeMessage('server-message')
  handleMessage(@MessageBody() dto: string, @ConnectedSocket() client: Socket,): void {
    console.log(dto);
    client.emit("client-message", 'return some notifications 1');
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log('Server Socket connected');
  }

  handleDisconnect(client): any {
    console.log('Server Socket disconnect');
  }
}
