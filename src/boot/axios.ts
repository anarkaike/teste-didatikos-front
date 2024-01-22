import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'
import { LocalStorage } from 'quasar'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_URL_BASE })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  api.defaults.baseURL = process.env.API_URL_BASE
  // api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  // api.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type'
  // api.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  app.config.globalProperties.$api = api
  const token: string | null = LocalStorage.getItem('LmToken')
  if (token) {
    api.defaults.headers.common.Authorization = 'Bearer ' + token
  }
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
