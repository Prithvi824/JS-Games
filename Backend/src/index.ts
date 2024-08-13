// Module imports
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import express, { Request, Response } from "express";

// Middleware and helper functions
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { checkGameAvailability, createUniqueId } from "./helper";

// Import Types
import { globalWsData, User } from "./types/globals";
import { playTicTacToe } from "./games/TicTactoe";
import path from "path";

// Loading ENV variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Setting up Application
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const wss: WebSocketServer = new WebSocketServer({ server });

app.use(bodyParser.json());

// Development dependencies
if (process.env.NODE_ENV === "development") {
  // Development Imports
  import("cors")
    .then((cors) => {
      app.use(cors.default());
    })
    .catch((err) => {
      console.error("Failed to load CORS middleware:", err);
    });
} else if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));
}

// Room management variables
const ROOMS: { [key: string]: User[] } = {};
let PREV: number = 0;

// Event handler for WebSocket connections
wss.on("connection", (ws: WebSocket) => {
  // Event handler for incoming messages from clients
  ws.on("message", (message: string) => {
    const data: globalWsData = JSON.parse(message);

    if (data.roomId.startsWith("1-")) {
      playTicTacToe(data, ROOMS, ws);
    }
  });

  // Event handler for WebSocket connection closing
  ws.on("close", () => {
    // Optionally, you could handle room cleanup here if needed
  });
});

app.post("/api/join", (req: Request, res: Response) => {
  const { roomId }: { roomId: string } = req.body;

  if (roomId in ROOMS && checkGameAvailability(roomId, ROOMS)) {
    return res.json({ success: true });
  }
});

app.post("/api/create", (req: Request, res: Response) => {
  const { gameId }: { gameId: string } = req.body;
  const uniqueId: string = createUniqueId(gameId, PREV);
  PREV += 1;

  ROOMS[uniqueId] = [];

  return res.json({
    success: true,
    roomId: uniqueId,
  });
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT: number = Number(process.env.PORT) || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server is listening on port ${PORT}`);
});
