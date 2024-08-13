"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const helper_1 = require("./helper");
const TicTactoe_1 = require("./games/TicTactoe");
const path_1 = __importDefault(require("path"));
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
app.use(body_parser_1.default.json());
if (process.env.NODE_ENV === "development") {
    const cors_1 = __importDefault(require("cors"));
    app.use((0, cors_1.default)());
}
else if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
}
const ROOMS = {};
let PREV = 0;
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.roomId.startsWith("1-")) {
            (0, TicTactoe_1.playTicTacToe)(data, ROOMS, ws);
        }
    });
    ws.on("close", () => {
    });
});
app.get("/", (req, res) => {
    return res.send("Hello World");
});
app.post("/api/join", (req, res) => {
    const { roomId } = req.body;
    if (roomId in ROOMS && (0, helper_1.checkGameAvailability)(roomId, ROOMS)) {
        return res.json({ success: true });
    }
});
app.post("/api/create", (req, res) => {
    const { gameId } = req.body;
    const uniqueId = (0, helper_1.createUniqueId)(gameId, PREV);
    PREV += 1;
    ROOMS[uniqueId] = [];
    return res.json({
        success: true,
        roomId: uniqueId,
    });
});
const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, () => {
    console.log(`WebSocket server is listening on port ${PORT}`);
});
