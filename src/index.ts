import { httpServer } from "./frameworks/webserver/config/socket";
import connectDb from "./frameworks/webserver/config/mongoDb";
import { redisDb } from "./frameworks/webserver/config/redis";
require("dotenv").config();

const PORT = process.env.PORT || 3000;

export const redis = redisDb();

const start = () => {
  httpServer.listen(PORT, () => {
    console.log(
      `server has been connected on http://localhost/${process.env.PORT}`
    );
    connectDb();
  });
};

start();
