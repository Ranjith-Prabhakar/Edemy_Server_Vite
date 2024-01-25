require('dotenv').config()
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"
import errorHandler from '../../../useCasese/handler/errorHandler'

//routes
import {userRoute} from '../routes/userRoute'

export const app = express()


app.use(cors({
  origin:"*",
  credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/v1/user/',userRoute(express.Router()))

app.use(errorHandler)
