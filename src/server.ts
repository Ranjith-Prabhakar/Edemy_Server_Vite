import {app} from './app'
import connectDb from './frameworks/config/db'
require("dotenv").config()

const start = ()=>{
app.listen(process.env.PORT,()=>{
  console.log(`server has been connected on http://localhost/${process.env.PORT}`)
connectDb()
})
}
export default start
