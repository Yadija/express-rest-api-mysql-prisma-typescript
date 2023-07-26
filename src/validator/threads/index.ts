import InvariantError from '../../exceptions/InvariantError'
import { ThreadPayloadSchema } from './schema'

// interface
import { ThreadInterface } from '../../interface/threadInterface'

const ThreadsValidator = {
  validateThreadPayload: (payload: ThreadInterface) => {
    const validationResult = ThreadPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

export default ThreadsValidator
