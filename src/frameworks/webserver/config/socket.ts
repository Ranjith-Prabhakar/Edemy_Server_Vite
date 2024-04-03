import { Server } from "socket.io";

import { app } from "./app";
import { createServer } from "http";

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socketTypes";

import { SocketClass } from "../../../useCasese/staticClassProperty/StaticClassProperty";

require("dotenv").config();

const httpServer = createServer(app);

const Io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: process.env.CLIENT,
  },
});

Io.on("connect", (client) => {
  if (client.handshake.query.userId) {
    SocketClass.SocketUsers[client.handshake.query.userId as string] = client;
  }

  client.on("disconnect", () => {
    console.log("the client ", client.id, " has been disconected");
    delete SocketClass.SocketUsers[client.handshake.query.userId as string];
  });
});

export { httpServer, Io };

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
