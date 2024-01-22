import ModelApiService from '@/services/api/ModelApiService'
import { IBrand, IResponse } from '@/interfaces'

export default class BrandsApiService extends ModelApiService {
  constructor () {
    super('brands')
  }

  async listAll (params = {}): Promise<IBrand[]> {
    const res: IResponse<IBrand[]> = await super.listAll(params)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async getById (id: number): Promise<IBrand> {
    const res: IResponse<IBrand> = await super.getById(id)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async create (user: IBrand): Promise<IBrand> {
    const res: IResponse<IBrand> = await super.create(user)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async update (user: IBrand): Promise<IBrand> {
    const res: IResponse<IBrand> = await super.update(user)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<IBrand> = await super.delete(id)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.success
  }
}
