import ModelApiService from '@/services/api/ModelApiService'
import { ICity, IResponse } from '@/interfaces'

export default class CitiesApiService extends ModelApiService {
  constructor () {
    super('cities')
  }

  async listAll (params = {}): Promise<ICity[]> {
    const res: IResponse<ICity[]> = await super.listAll(params)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async getById (id: number): Promise<ICity> {
    const res: IResponse<ICity> = await super.getById(id)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async create (user: ICity): Promise<ICity> {
    const res: IResponse<ICity> = await super.create(user)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async update (user: ICity): Promise<ICity> {
    const res: IResponse<ICity> = await super.update(user)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<ICity> = await super.delete(id)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.success
  }
}
