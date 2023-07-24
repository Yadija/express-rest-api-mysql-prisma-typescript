import bcrypt from 'bcrypt'
import { prismaClient } from '../src/application/database'

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test'
    }
  })
}

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      id: 'test',
      username: 'test',
      password: await bcrypt.hash('secret', 10),
      fullname: 'test'
    }
  })
}

export const getTestUser = async () => await prismaClient.user.findUnique({
  where: {
    id: 'test'
  }
})
