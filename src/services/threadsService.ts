import { nanoid } from 'nanoid'
import { prismaClient } from '../application/database'

// exceptions
import AuthorizationError from '../exceptions/AuthorizationError'
import NotFoundError from '../exceptions/NotFoundError'

// utils
import { mapDBToModel } from '../utils/index'

const addthread = async (content: string, owner: string) => {
  const id = `thread-${nanoid(15)}`

  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const thread = {
    id, content, owner, created_at: createdAt, updated_at: updatedAt
  }

  const result = await prismaClient.thread.create({
    data: thread,
    select: {
      id: true
    }
  })

  return result.id
}

const getAllThreads = async () => {
  return await prismaClient.thread.findMany({
    select: {
      id: true,
      content: true,
      owner: true
    }
  })
}

const getThreadById = async (id: string) => {
  const result = await prismaClient.thread.findMany({
    where: {
      id
    }
  })

  if (!result[0]) {
    throw new NotFoundError('cannot find thread')
  }

  return result.map(mapDBToModel)[0]
}

const editThreadById = async (id: string, content: string) => {
  const updatedAt = new Date().toISOString()

  await prismaClient.thread.update({
    where: {
      id
    },
    data: {
      content,
      updated_at: updatedAt
    }
  })
}

const deleteThreadById = async (id: string) => {
  await prismaClient.thread.delete({
    where: {
      id
    }
  })
}

const checkThreadIsExist = async (id: string) => {
  const thread = await prismaClient.thread.findFirst({
    where: {
      id
    },
    select: {
      owner: true
    }
  })

  if (!thread) {
    throw new NotFoundError('cannot find thread')
  }

  return thread
}

const verifyThreadOwner = async (id: string, owner: string) => {
  const thread = await checkThreadIsExist(id)

  if (thread.owner !== owner) {
    throw new AuthorizationError('you are not entitled to access this resource')
  }
}

export default {
  addthread,
  getAllThreads,
  getThreadById,
  editThreadById,
  deleteThreadById,
  checkThreadIsExist,
  verifyThreadOwner
}
