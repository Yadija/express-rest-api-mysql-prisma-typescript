import InvariantError from '../../exceptions/InvariantError'
import { UserPayloadSchema } from './schema'

// interface
import { AddUserInterface } from '../../interface/userInterface'

const UsersValidator = {
  validateUserPayload: (payload: AddUserInterface) => {
    const validationResult = UserPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

export default UsersValidator
