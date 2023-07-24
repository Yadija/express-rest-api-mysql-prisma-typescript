import { NextFunction, Request, Response } from 'express'
import ClientError from '../exceptions/ClientError'

const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next()
    return
  }

  if (err instanceof ClientError) {
    res.status(err.statusCode).json({
      status: 'fail',
      message: err.message
    }).end()
  } else {
    res.status(500).json({
      status: 'fail',
      message: err.message
    }).end()
  }
}

export default errorMiddleware
