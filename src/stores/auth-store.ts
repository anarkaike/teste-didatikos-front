import { defineStore } from 'pinia'
import { Dialog, LocalStorage } from 'quasar'
import { $api } from '@/services/api'
import { IAuthResponse, IUser } from '@/interfaces'
import { $notify, $loading } from '@/composables'
import { Router } from 'vue-router'

export const authStore = defineStore('authStore', {
  state: () => ({
    user: null as IUser | null,
    token: null as string|null,
    menu_opened: true as boolean
  }),
  getters: {
    isLoggedIn: (state) => {
      return !!state.token
    }
  },
  actions: {
    toogleMenu () {
      this.menu_opened = !this.menu_opened
    },
    /**
     * Login - Gerar token de acesso na API e criar sessão do usuário
     *
     * @param email
     * @param password
     * @param router - Se passar o router, um redirect para /login é feito automaticamente apos a limpesa da sessão
     */
    async login (email: string, password: string, router: Router|null = null): Promise<IAuthResponse> {
      $loading.show('Realizando acesso...')
      try {
        // Chamando login da API e verificando sucesso
        const res = await $api.auth.login(email, password)
        if (!res.success) {
          console.error('Erro no requst login: ', res)
          throw new Error(res.message)
        }

        // Gravando dados no state
        LocalStorage.set('LmToken', res.data.token.plainTextToken)
        this.user = res.data.user
        this.token = res.data.token.plainTextToken

        $loading.hide()
        $notify.success('Acesso realizado com sucesso')
        if (router) await router.push({ name: 'home' })
        return res
      } catch (err) {
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao acessar o sistema')
        console.error('Erro no login no catch:  ', err)
        throw err
      }
    },
    /**
     * AutoRegister - Auto cadastro feito pelo cliete que cai na landing page. Cria sessão apos realizado
     *
     * @param user
     * @param router - Se passar o router, um redirect para /login é feito automaticamente apos a limpesa da sessão
     */
    async autoRegister (user: IUser, router: Router|null = null): Promise<IAuthResponse> {
      $loading.show('Realizando cadastro...')
      try {
        // Chamando autoRegister da API
        const res = await $api.auth.autoRegister(user)
        if (!res.success) {
          console.error('Erro no request autoRegister: ', res)
          throw new Error(res.message)
        }

        // Gravando retorno no state
        LocalStorage.set('LmToken', res.data.token.plainTextToken)
        this.user = res.data.user
        this.token = res.data.token.plainTextToken

        $loading.hide()
        $notify.success('Cadastro realizado com sucesso')
        if (router) await router.push({ name: 'home' })
        return res
      } catch (err) {
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (err?.response?.data?.message === 'denied_access') this.router.push({ name: 'login' })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao realizar o cadastro')
        console.error('Erro no autoRegister: ', err)
        throw err
      }
    },

    /**
     * Logout - Encerramento da sessão do usuário na API e limpeza da sessão
     *
     * @param router - Se passar o router, um redirect para /login é feito automaticamente apos a limpesa da sessão
     */
    async logout (router: Router|null = null): Promise<void> {
      try {
        Dialog.create({
          title: 'Sair do sistema?',
          message: 'Deseja realmente encerrar seu acesso?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          $loading.show('Encerrando acesso...')
          // Resetando estado
          this.user = this.token = null

          // Chamando logout da api e verificando sucesso
          const res = await $api.auth.logout()
          if (!res.success) {
            console.error('Erro no request logout: ', res)
            throw new Error(res.message)
          }

          $loading.hide()
          $notify.success('Acesso encerrado com sucesso')
          LocalStorage.clear()
          if (router) await router.push({ name: 'login' })
        })
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao encerrar o sistema')
        $loading.hide()
        console.error('Erro no logou no catch: ', err)
        throw err
      }
    }
  },
  persist: true
})
