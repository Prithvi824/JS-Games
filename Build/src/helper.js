"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUniqueId = createUniqueId;
exports.sendToAllUsers = sendToAllUsers;
exports.sendToAllNotToMe = sendToAllNotToMe;
exports.checkGameAvailability = checkGameAvailability;
function createUniqueId(Id, prev) {
    const timeStamp = Date.now();
    return `${Id}-${(timeStamp % 10000).toString().padStart(4, "0")}-${prev + 1}`;
}
function sendToAllUsers(room, data) {
    room.forEach((user) => {
        user.socket.send(JSON.stringify(data));
    });
}
function sendToAllNotToMe(exclude, room, data) {
    room.forEach((user) => {
        if (user.socket !== exclude) {
            user.socket.send(JSON.stringify(data));
        }
    });
}
function checkGameAvailability(roomId, ROOMS) {
    if (roomId.startsWith("1-") && ROOMS[roomId].length < 2) {
        return true;
    }
    else
        return false;
}
