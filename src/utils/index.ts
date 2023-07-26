/* eslint-disable @typescript-eslint/naming-convention */
interface ThreadInterface {
  id: string
  content: string
  owner: string
  created_at: string
  updated_at: string
}

const mapDBToModel = ({
  id,
  content,
  owner,
  created_at,
  updated_at
}: ThreadInterface) => ({
  id,
  content,
  owner,
  createdAt: created_at,
  updatedAt: updated_at
})

export { mapDBToModel }
