import express from 'express'

// controllers
import threadsController from '../controllers/threadsController'

// middleware
import authenticationMiddleware from '../middleware/authenticationMiddleware'

const threadRouter = express.Router()

threadRouter.get('/threads', threadsController.getThreadsController)
threadRouter.get('/threads/:threadId', threadsController.getThreadByIdController)

threadRouter.use(authenticationMiddleware)

threadRouter.post('/threads', threadsController.postThreadController)
threadRouter.put('/threads/:threadId', threadsController.putThreadByIdController)
threadRouter.delete('/threads/:threadId', threadsController.deleteThreadByIdController)

export default threadRouter
