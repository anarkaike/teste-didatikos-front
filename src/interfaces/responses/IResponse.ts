export default interface IResponse<T = [], L = []> {
  data: T,
  message: string,
  code?: string | null,
  metadata: L,
  success: boolean
}
