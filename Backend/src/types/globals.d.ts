import { WebSocket } from "ws";

export interface User {
  socket: WebSocket;
  symbol: string;
  turn: boolean;
  ready: boolean;
}

export interface globalWsData {
  type: string;
  roomId: string;
  [key: string]: string
}