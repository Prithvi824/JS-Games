import { WebSocket } from "ws";
import { globalWsData, User } from "../types/globals";
import { sendToAllNotToMe, sendToAllUsers } from "../helper";

export function playTicTacToe(
  data: globalWsData,
  ROOMS: { [key: string]: User[] },
  ws: WebSocket
) {
  // Handle player connection
  if (data.type === "connect" && ROOMS[data.roomId]?.length < 2) {
    // Create Data to add in ROOMS list
    const details: User = {
      socket: ws,
      symbol: ROOMS[data.roomId]?.length === 0 ? "O" : "X",
      turn: ROOMS[data.roomId]?.length === 0,
      ready: false,
    };

    // Create data for the player and opponent
    const me = {
      name: "Me",
      points: 0,
      symbol: details.symbol,
      turn: details.turn,
    };
    const opponent = {
      name: "Opponent",
      points: 0,
      symbol: details.symbol === "O" ? "X" : "O",
      turn: !details.turn,
    };

    // Add the client to the ROOM
    ROOMS[data.roomId].push(details);

    // Send details to the client to setup Player
    ws.send(JSON.stringify({ type: "set-player", me, opponent }));

    // If two players are in the same room
    // Then send a signal to be ready
    if (ROOMS[data.roomId].length === 2) {
      sendToAllUsers(ROOMS[data.roomId], {
        type: "ready",
        roomId: data.roomId,
      });
    }
  }

  // Send new move to other Player
  if (data.type === "move") sendToAllNotToMe(ws, ROOMS[data.roomId], data);

  // Send Game winner to other Player
  if (data.type === "winner") sendToAllNotToMe(ws, ROOMS[data.roomId], data);

  // Handle play-again request
  if (data.type === "play-again") {
    const user = ROOMS[data.roomId].find((user) => user.socket === ws);
    if (user) user.ready = true;

    // Check if both players are ready to play again
    if (ROOMS[data.roomId].every((user) => user.ready)) {
      sendToAllUsers(ROOMS[data.roomId], {
        type: "reset-game",
        roomId: data.roomId,
      });
      ROOMS[data.roomId].forEach((user) => (user.ready = false));
    }
  }
}
