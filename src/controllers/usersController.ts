import { NextFunction, Request, Response } from 'express'

// services
import usersService from '../services/usersService'

// validator
import UsersValidator from '../validator/users/index'

const postUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    UsersValidator.validateUserPayload(req.body)
    const id = await usersService.addUser(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        userId: id
      }
    })
  } catch (error) {
    next(error)
  }
}

const getUsersByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params

    const user = await usersService.getUserById(userId)
    res.status(200).json({
      status: 'success',
      data: user
    })
  } catch (error) {
    next(error)
  }
}

export default { postUserController, getUsersByIdController }
