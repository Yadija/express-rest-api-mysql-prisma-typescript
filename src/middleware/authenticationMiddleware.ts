import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

// exceptions
import AuthenticationError from '../exceptions/AuthenticationError'

declare module 'express-serve-static-core' {
  interface Request {
    credentialId: string
  }
}

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')

    if (!authHeader) throw new AuthenticationError('unauthorized')

    const accessToken = authHeader.split(' ')[1]
    const { id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY as string) as { id: string }

    req.credentialId = id
    next()
  } catch (error) {
    next(error)
  }
}

export default authenticationMiddleware
