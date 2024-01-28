require('dotenv').config()
import express,{ NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors"
import {errorMiddleware} from '../../../useCasese/handler/errorMiddleware'

//routes
import {userRoute} from '../routes/userRoute'
import { adminRoute } from '../routes/adminRoutes'

export const app = express()


app.use(cors({
  origin:"*",
  credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/v1/',userRoute(express.Router()))
app.use("/api/v1/admin/", adminRoute(express.Router()));

//unknown url

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error  = new Error(`route ${req.originalUrl} isn't found`) as any
  error.statusCode = 404
  next(error)
})

app.use(errorMiddleware);
