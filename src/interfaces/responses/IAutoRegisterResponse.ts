import type { IToken, IUser } from '@/interfaces'

export default interface IAutoRegisterResponse<T = []> {
  data: {
    token: IToken,
    user: IUser
  },
  message: string,
  metadata: T,
  success: boolean
}
