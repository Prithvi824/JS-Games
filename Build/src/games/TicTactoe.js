"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playTicTacToe = playTicTacToe;
const helper_1 = require("../helper");
function playTicTacToe(data, ROOMS, ws) {
    var _a, _b, _c;
    if (data.type === "connect" && ((_a = ROOMS[data.roomId]) === null || _a === void 0 ? void 0 : _a.length) < 2) {
        const details = {
            socket: ws,
            symbol: ((_b = ROOMS[data.roomId]) === null || _b === void 0 ? void 0 : _b.length) === 0 ? "O" : "X",
            turn: ((_c = ROOMS[data.roomId]) === null || _c === void 0 ? void 0 : _c.length) === 0,
            ready: false,
        };
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
        ROOMS[data.roomId].push(details);
        ws.send(JSON.stringify({ type: "set-player", me, opponent }));
        if (ROOMS[data.roomId].length === 2) {
            (0, helper_1.sendToAllUsers)(ROOMS[data.roomId], {
                type: "ready",
                roomId: data.roomId,
            });
        }
    }
    if (data.type === "move")
        (0, helper_1.sendToAllNotToMe)(ws, ROOMS[data.roomId], data);
    if (data.type === "winner")
        (0, helper_1.sendToAllNotToMe)(ws, ROOMS[data.roomId], data);
    if (data.type === "play-again") {
        const user = ROOMS[data.roomId].find((user) => user.socket === ws);
        if (user)
            user.ready = true;
        if (ROOMS[data.roomId].every((user) => user.ready)) {
            (0, helper_1.sendToAllUsers)(ROOMS[data.roomId], {
                type: "reset-game",
                roomId: data.roomId,
            });
            ROOMS[data.roomId].forEach((user) => (user.ready = false));
        }
    }
}
