import { NextFunction, Request, Response } from 'express'

// services
import authenticationsService from '../services/authenticationsService'
import usersService from '../services/usersService'

// validator
import AuthenticationsValidator from '../validator/authentications/index'

// token
import tokenManager from '../tokenize/tokenManager'

const postAuthenticationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    AuthenticationsValidator.validatePostAuthenticationPayload(req.body)

    const { username, password } = req.body
    const id = await usersService.verifyUserCredential(username, password)

    const accessToken = tokenManager.generateAccessToken({ id })
    const refreshToken = tokenManager.generateRefreshToken({ id })

    await authenticationsService.addRefreshToken(refreshToken)

    res.status(201).json({
      status: 'success',
      data: {
        accessToken,
        refreshToken
      }
    })
  } catch (error) {
    next(error)
  }
}

const putAuthenticationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    AuthenticationsValidator.validatePutAuthenticationPayload(req.body)

    const { refreshToken } = req.body
    await authenticationsService.verifyRefreshToken(refreshToken)

    const { id } = tokenManager.verifyRefreshToken(refreshToken)
    const accessToken = tokenManager.generateAccessToken({ id })

    res.status(200).json({
      status: 'success',
      data: {
        accessToken
      }
    })
  } catch (error) {
    next(error)
  }
}

const deleteAuthenticationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    AuthenticationsValidator.validateDeleteAuthenticationPayload(req.body)

    const { refreshToken } = req.body

    await authenticationsService.verifyRefreshToken(refreshToken)
    await authenticationsService.deleteRefreshToken(refreshToken)

    res.status(200).json({
      status: 'success',
      message: 'refresh token deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export default { postAuthenticationController, putAuthenticationController, deleteAuthenticationController }
