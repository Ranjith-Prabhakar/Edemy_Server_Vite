"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Io = exports.httpServer = void 0;
const socket_io_1 = require("socket.io");
const app_1 = require("./app");
const http_1 = require("http");
const StaticClassProperty_1 = require("../../../useCasese/staticClassProperty/StaticClassProperty");
require("dotenv").config();
const httpServer = (0, http_1.createServer)(app_1.app);
exports.httpServer = httpServer;
const Io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CLIENT,
    },
});
exports.Io = Io;
Io.on("connect", (client) => {
    if (client.handshake.query.userId) {
        StaticClassProperty_1.SocketClass.SocketUsers[client.handshake.query.userId] = client;
    }
    client.on("disconnect", () => {
        console.log("the client ", client.id, " has been disconected");
        delete StaticClassProperty_1.SocketClass.SocketUsers[client.handshake.query.userId];
    });
});
// import { Server } from "socket.io";
// import { app } from "./app";
// import { createServer } from "http";
// import { ClientToServerEvents, ServerToClientEvents } from "../../types/socketTypes";
// require("dotenv").config();
// const httpServer = createServer(app);
// const Io = new Server<ServerToClientEvents, ClientToServerEvents>(httpServer, {
//   cors: {
//     origin: process.env.CLIENT,
//   },
// });
// Io.on("connect", (client) => {
//   console.log("one client has been connected", client.id);
//   client.on("disconnect", () => {
//     console.log("the client ", client.id, " has been disconected");
//   });
// });
// export { httpServer, Io};
//# sourceMappingURL=socket.js.map