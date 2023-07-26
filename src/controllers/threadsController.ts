import { NextFunction, Request, Response } from 'express'

// services
import threadsService from '../services/threadsService'

// validator
import ThreadsValidator from '../validator/threads/index'

const postThreadController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    ThreadsValidator.validateThreadPayload(req.body)

    const { content } = req.body
    const { credentialId: owner } = req

    const id = await threadsService.addthread(content, owner)

    res.status(201).json({
      status: 'success',
      data: {
        threadId: id
      }
    })
  } catch (error) {
    next(error)
  }
}

const getThreadsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const threads = await threadsService.getAllThreads()

    res.status(200).json({
      status: 'success',
      data: {
        threads
      }
    })
  } catch (error) {
    next(error)
  }
}

const getThreadByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { threadId } = req.params
    const thread = await threadsService.getThreadById(threadId)

    res.status(200).json({
      status: 'success',
      data: {
        thread
      }
    })
  } catch (error) {
    next(error)
  }
}

const putThreadByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    ThreadsValidator.validateThreadPayload(req.body)

    const { threadId } = req.params
    const { content } = req.body
    const { credentialId: owner } = req

    await threadsService.verifyThreadOwner(threadId, owner)
    await threadsService.editThreadById(threadId, content)

    res.status(200).json({
      status: 'success',
      message: 'thread updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

const deleteThreadByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { threadId } = req.params
    const { credentialId: owner } = req

    await threadsService.verifyThreadOwner(threadId, owner)
    await threadsService.deleteThreadById(threadId)

    res.status(200).json({
      status: 'success',
      message: 'thread deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export default {
  postThreadController,
  getThreadsController,
  getThreadByIdController,
  putThreadByIdController,
  deleteThreadByIdController
}
