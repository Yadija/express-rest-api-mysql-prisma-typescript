import express, { Application } from 'express'
import errorMiddleware from '../middleware/errorMiddleware'

export const web: Application = express()
web.use(express.json())

web.use(errorMiddleware)
