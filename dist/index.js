"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const socket_1 = require("./frameworks/webserver/config/socket");
const mongoDb_1 = __importDefault(require("./frameworks/webserver/config/mongoDb"));
const redis_1 = require("./frameworks/webserver/config/redis");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
exports.redis = (0, redis_1.redisDb)();
const start = () => {
    socket_1.httpServer.listen(PORT, () => {
        console.log(`server has been connected on http://localhost/${process.env.PORT}`);
        (0, mongoDb_1.default)();
    });
};
start();
// import {app} from './frameworks/webserver/config/app'
// import connectDb from './frameworks/webserver/config/mongoDb'
// import { redisDb } from './frameworks/webserver/config/redis'
// require("dotenv").config()
// const PORT = process.env.PORT || 3000
// export const redis = redisDb()
// const start = ()=>{
// app.listen(PORT,()=>{
//   console.log(`server has been connected on http://localhost/${process.env.PORT}`)
// connectDb()
// })
// }
// start()
//# sourceMappingURL=index.js.map