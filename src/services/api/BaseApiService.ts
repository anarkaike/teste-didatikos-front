// import { $notify } from '@/composables'
import { AxiosResponse } from 'axios/index'
// import { $stores } from '@/stores/all'
import { LocalStorage } from 'quasar'
import { api } from '@/boot/axios'
// import { useRouter } from 'vue-router'
// import router from '@/router'

// const $q = useQuasar()

export default class BaseApiService {
  resource?: string

  constructor (resource?: string) {
    this.resource = resource
  }

  getUrlForListAll () {
    return `${this.resource}`
  }

  getUrlForGetById (id: number) {
    return `${this.resource}/${id}`
  }

  getUrlForCreate () {
    return `${this.resource}`
  }

  getUrlForUpdate (id: number) {
    return `${this.resource}/${id}`
  }

  getUrlForDelete (id: number) {
    return `${this.resource}/${id}`
  }

  getUrlForBi () {
    return `${this.resource}/bi`
  }

  setToken () {
    const token: string | null = LocalStorage.getItem('LmToken')
    if (token) {
      api.defaults.headers.common.Authorization = 'Bearer ' + token
    }
  }

  async request (method = 'get', endPoint: string) {
    try {
      this.setToken()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res: AxiosResponse = await api[method](endPoint)
      return res.data
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.handleErrors(err)
      throw err
    }
  }

  async post (endPoint: string) {
    return await this.request('post', endPoint)
  }

  async put (endPoint: string) {
    return await this.request('put', endPoint)
  }

  async get (endPoint: string) {
    return await this.request('get', endPoint)
  }

  handleErrors () {
    LocalStorage.clear()
    // Queria redirecionar para o login aqui mas não consegui
    // $stores.auth.logout()
    // const router = useRouter()
    // const r = router.getRoutes()
    // router.push({ name: 'login' }).then(r => {
    //   $notify.info('A sessão encerrou. Entre novamente.')
    // })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // notifyError('Erro: ' + err.message)
  }
}
