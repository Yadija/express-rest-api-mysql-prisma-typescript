import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { prismaClient } from '../application/database'

// exceptions
import InvariantError from '../exceptions/InvariantError'
import NotFoundError from '../exceptions/NotFoundError'

// interface
import { AddUserInterface } from '../interface/userInterface'

const addUser = async ({ username, password, fullname }: AddUserInterface) => {
  if (/\s/.test(username)) {
    throw new InvariantError('username contain forbiden character')
  }

  await verifyNewUsername(username)

  const id = `user-${nanoid(15)}`
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = {
    id, username, password: hashedPassword, fullname
  }

  const result = await prismaClient.user.create({
    data: user,
    select: {
      id: true
    }
  })

  return result.id
}

const verifyNewUsername = async (username: string) => {
  const count = await prismaClient.user.count({
    where: {
      username
    }
  })

  if (count > 0) {
    throw new InvariantError('username already exists')
  }
}

const getUserById = async (userId: string) => {
  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      id: userId
    }
  })

  if (!totalUserInDatabase) {
    throw new NotFoundError('cannot find user')
  }

  return await prismaClient.user.findFirst({
    where: {
      id: userId
    },
    select: {
      id: true,
      username: true,
      fullname: true
    }
  })
}

export default { addUser, getUserById }
