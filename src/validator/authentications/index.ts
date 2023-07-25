import InvariantError from '../../exceptions/InvariantError'
import {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema
} from './schema'

// interface
import { PostAuthenticationInterface, RefreshTokenInterface } from '../../interface/authenticationInterface'

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload: PostAuthenticationInterface) => {
    const validationResult = PostAuthenticationPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },

  validatePutAuthenticationPayload: (payload: RefreshTokenInterface) => {
    const validationResult = PutAuthenticationPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },

  validateDeleteAuthenticationPayload: (payload: RefreshTokenInterface) => {
    const validationResult = DeleteAuthenticationPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

export default AuthenticationsValidator
