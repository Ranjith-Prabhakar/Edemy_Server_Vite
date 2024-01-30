import {app} from './frameworks/webserver/config/app'
import connectDb from './frameworks/webserver/config/db'
import { redisDb } from './frameworks/database/redis/config'
require("dotenv").config()

const PORT = process.env.PORT || 3000

export const redis = redisDb()

const start = ()=>{
app.listen(PORT,()=>{
  console.log(`server has been connected on http://localhost/${process.env.PORT}`)
connectDb()

})
}

start()


