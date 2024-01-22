import BaseApiService from '@/services/api/BaseApiService'
import { IAuthResponse, IUser } from '@/interfaces'
import { AxiosResponse } from 'axios'
import { api } from '@/boot/axios'

export default class AuthApiService extends BaseApiService {
  async login (email: string, password: string): Promise<IAuthResponse> {
    try {
      const res: AxiosResponse = await api.post('/login', { email, password })
      return res.data
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.handleErrors(err)
      throw err
    }
  }

  async autoRegister (user: IUser): Promise<IAuthResponse> {
    try {
      const res: AxiosResponse = await api.post('/register', user)
      return res.data
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.handleErrors(err)
      throw err
    }
  }

  async logout (): Promise<IAuthResponse> {
    try {
      this.setToken()
      const res: AxiosResponse = await api.post('/logout')
      return res.data
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.handleErrors(err)
      throw err
    }
  }
}
