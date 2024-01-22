import BaseApiService from '@/services/api/BaseApiService'
import { api } from '@/boot/axios'
import { AxiosResponse } from 'axios'
import qs from 'qs'

export default class ReadOnlyApiService extends BaseApiService {
  async listAll (params = {}) {
    try {
      let urlParams = qs.stringify(params)
      if (urlParams !== '') {
        urlParams = '?' + urlParams
      }
      this.setToken()
      const res = await api.get(this.getUrlForListAll() + urlParams, params)
      return res.data
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.handleErrors(err)
      throw err
    }
  }

  async getById (id: number) {
    try {
      this.setToken()
      const res: AxiosResponse = await api.get(this.getUrlForGetById(id))
      return res.data
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.handleErrors(err)
      throw err
    }
  }
}
