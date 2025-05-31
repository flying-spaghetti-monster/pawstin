import { io, Socket } from 'socket.io-client';

export default class SocketApi {
  static socket: null | Socket = null;

  private static onConnect(): void {
    console.log('SocketApi: onConnect');
  }

  private static onDisconnect(): void {
    console.log('SocketApi: onDisconnect');
  }

  static createConnection() {
    this.socket = io('http://localhost:3000')

    this.socket.on('connect', this.onConnect);
    this.socket.on('disconnect', this.onDisconnect);
  }
}