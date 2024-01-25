import {app} from './frameworks/webserver/config/app'
import connectDb from './frameworks/webserver/config/db'
require("dotenv").config()
const PORT = process.env.PORT || 3000

const start = ()=>{
app.listen(PORT,()=>{
  console.log(`server has been connected on http://localhost/${process.env.PORT}`)
connectDb()
})
}
start()
