import express from 'express'

// controllers
import usersController from '../controllers/usersController'

const userRouter = express.Router()
userRouter.post('/users', usersController.postUserController)
userRouter.get('/users/:userId', usersController.getUsersByIdController)

export default userRouter
