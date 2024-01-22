import type { IUser, IToken, ISaasClient } from '@/interfaces'

export default interface IAuthResponse<T = []> {
  data: {
    token: IToken,
    user: IUser,
    saasClient: ISaasClient
  },
  message: string,
  code?: string | null,
  metadata: T,
  success: boolean
}
