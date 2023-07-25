import express from 'express'

// controllers
import authenticationsController from '../controllers/authenticationsController'

const authenticationRouter = express.Router()
authenticationRouter.post('/authentications', authenticationsController.postAuthenticationController)
authenticationRouter.put('/authentications', authenticationsController.putAuthenticationController)
authenticationRouter.delete('/authentications', authenticationsController.deleteAuthenticationController)

export default authenticationRouter
