/// <reference types="node" />
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../../types/socketTypes";
declare const httpServer: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
declare const Io: Server<ClientToServerEvents, ServerToClientEvents, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
export { httpServer, Io };
