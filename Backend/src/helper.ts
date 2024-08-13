import { User } from "./types/globals";
import { WebSocket } from "ws";

export function createUniqueId(Id: string, prev: number): string {
  const timeStamp = Date.now();
  return `${Id}-${(timeStamp % 10000).toString().padStart(4, "0")}-${prev + 1}`;
}

export function sendToAllUsers(room: User[], data: Object): void {
  room.forEach((user) => {
    user.socket.send(JSON.stringify(data));
  });
}

export function sendToAllNotToMe(
  exclude: WebSocket,
  room: User[],
  data: Object
): void {
  room.forEach((user) => {
    if (user.socket !== exclude) {
      user.socket.send(JSON.stringify(data));
    }
  });
}

export function checkGameAvailability(
  roomId: string,
  ROOMS: { [key: string]: User[] }
): boolean {
  // Check if there is only One player in the room
  // Return true if there is one else false

  if (roomId.startsWith("1-") && ROOMS[roomId].length < 2) {
    return true;
  } else return false;
}
