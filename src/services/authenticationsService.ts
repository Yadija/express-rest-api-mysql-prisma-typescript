import { nanoid } from 'nanoid'
import { prismaClient } from '../application/database'

// exceptions
import InvariantError from '../exceptions/InvariantError'

const addRefreshToken = async (token: string) => {
  const id = `auth-${nanoid(15)}`
  await prismaClient.authentication.create({
    data: {
      id,
      token
    }
  })
}

const verifyRefreshToken = async (token: string) => {
  const totalItemInDatabase = await prismaClient.authentication.count({
    where: {
      token
    }
  })

  if (!totalItemInDatabase) {
    throw new InvariantError('invalid refresh token')
  }
}

const deleteRefreshToken = async (token: string) => {
  await prismaClient.authentication.deleteMany({
    where: {
      token
    }
  })
}

export default { addRefreshToken, verifyRefreshToken, deleteRefreshToken }
