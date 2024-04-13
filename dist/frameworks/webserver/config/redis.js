"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisDb = void 0;
const ioredis_1 = require("ioredis");
require("dotenv").config();
//create a redis client
function redisDb() {
    const redisClient = () => {
        if (process.env.REDIS_URL) {
            console.log("redis has been connected");
            return process.env.REDIS_URL;
        }
        throw new Error("Redis connection failed");
    };
    const redis = new ioredis_1.Redis(redisClient());
    return redis;
}
exports.redisDb = redisDb;
//# sourceMappingURL=redis.js.map