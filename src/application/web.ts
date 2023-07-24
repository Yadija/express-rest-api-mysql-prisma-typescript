import express, { Application } from 'express'
import errorMiddleware from '../middleware/errorMiddleware'

// routes
import userRouter from '../routes/users'

export const web: Application = express()
web.use(express.json())

web.use(userRouter)

web.use(errorMiddleware)
