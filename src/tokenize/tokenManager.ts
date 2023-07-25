import jwt from 'jsonwebtoken'

// exceptions
import InvariantError from '../exceptions/InvariantError'

interface JwtPayload {
  id: string
}

const tokenManager = {
  generateAccessToken: (payload: { id: string }) => jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_KEY as string,
    { expiresIn: process.env.ACCESS_TOKEN_AGE }
  ),
  generateRefreshToken: (payload: { id: string }) => jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_KEY as string,
    { expiresIn: process.env.ACCESS_TOKEN_AGE }
  ),
  verifyRefreshToken: (refreshToken: string) => {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY as string) as JwtPayload

      return payload
    } catch (error) {
      throw new InvariantError('invalid refresh token')
    }
  }
}

export default tokenManager
