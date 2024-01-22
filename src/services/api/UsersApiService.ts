import ModelApiService from '@/services/api/ModelApiService'
import { IResponse, IUser } from '@/interfaces'

export default class UsersApiService extends ModelApiService {
  constructor () {
    super('users')
  }

  async listAll (params = {}): Promise<IUser[]> {
    const res: IResponse<IUser[]> = await super.listAll(params)
    if (!res.success) {
      throw res
    }
    return res.data
  }

  async getById (id: number): Promise<IUser> {
    const res: IResponse<IUser> = await super.getById(id)
    if (!res.success) {
      throw res
    }
    return res.data
  }

  async create (user: IUser): Promise<IUser> {
    const res: IResponse<IUser> = await super.create(user)
    if (!res.success) {
      if (res.message === 'Validation errors') {
        throw new Error(JSON.stringify(res.data))
      } else {
        throw new Error(res.message)
      }
    }
    return res.data
  }

  async update (user: IUser): Promise<IUser> {
    const res: IResponse<IUser> = await super.update(user)
    if (!res.success) {
      throw res
    }
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<IUser> = await super.delete(id)
    if (!res.success) {
      throw res
    }
    return res.success
  }
}
