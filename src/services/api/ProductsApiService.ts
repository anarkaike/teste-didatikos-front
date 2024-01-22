import ModelApiService from '@/services/api/ModelApiService'
import { IProduct, IResponse } from '@/interfaces'

export default class ProductsApiService extends ModelApiService {
  constructor () {
    super('products')
  }

  async listAll (params = {}): Promise<IProduct[]> {
    const res: IResponse<IProduct[]> = await super.listAll(params)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async getById (id: number): Promise<IProduct> {
    const res: IResponse<IProduct> = await super.getById(id)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async create (user: IProduct): Promise<IProduct> {
    const res: IResponse<IProduct> = await super.create(user)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async update (user: IProduct): Promise<IProduct> {
    const res: IResponse<IProduct> = await super.update(user)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.data
  }

  async delete (id: number): Promise<boolean> {
    const res: IResponse<IProduct> = await super.delete(id)
    if (!res.success) {
      throw new Error(res.message)
    }
    return res.success
  }
}
