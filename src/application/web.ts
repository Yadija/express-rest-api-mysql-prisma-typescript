import express, { Application } from 'express'
import errorMiddleware from '../middleware/errorMiddleware'

// routes
import userRouter from '../routes/users'
import authenticationRouter from '../routes/authentications'
import threadRouter from '../routes/threads'

export const web: Application = express()
web.use(express.json())

web.use(userRouter)
web.use(authenticationRouter)
web.use(threadRouter)

web.use(errorMiddleware)
