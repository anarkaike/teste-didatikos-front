import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { IProduct, IOption } from '@/interfaces'

export const productsStore = defineStore('productsStore', {
  state: () => ({
    products: [] as IProduct[],
    loading: false as boolean
  }),
  getters: {
    list: (state) => {
      return state.products
    }
  },
  actions: {
    async listAll (): Promise<IProduct[]> {
      try {
        this.loading = true
        // Buscando produtos na API
        if (this.products.length === 0) {
          this.products = await $api.products.listAll()
        }
        setTimeout(async () => {
          // Chamo de forma asyncrona para atualizar o store posteriormente
          this.loading = true
          this.products = await $api.products.listAll()
          this.loading = false
        }, 500)

        this.loading = false
        return this.products
      } catch (err) {
        console.error('Erro ao listar os produtos: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao listar os produtos')
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      try {
        // Buscando produtos e formatando de saida
        const products = await this.listAll()

        // Remontando retorno para preenchimento de selects
        return products.map((product: IProduct) => { return { id: product.id, label: product.name } as IOption })
      } catch (err) {
        console.error('Erro ao listar os produtos para options: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao listar os produtos para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<IProduct> {
      $loading.show('Buscando produtos...')
      try {
        // Buscando produtos no state
        const products = this.$state.products.filter((productRow: IProduct) => productRow.id === id)
        // Se não encontrar no state busca na API
        let product: IProduct = products[0] ?? null
        if (!product) {
          product = await $api.products.getById(id)
        }

        $loading.hide()
        $notify.success(`O produto "${product.name}" foi carregado com sucesso`)
        return product
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados do produto de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao carregar os dados do produto de ID ${id}`)
        throw err
      }
    },
    async create (product: IProduct): Promise<IProduct> {
      $loading.show(`Cadastrando produto "${product.name}"...`)
      try {
        // Criando produto na API e adicionando ao state
        const productCreated: IProduct = await $api.products.create(product)
        // Removendo do state
        this.products.unshift(productCreated)

        $loading.hide()
        $notify.success(`O produto "${product.name}" foi cadastrado com sucesso`)
        return productCreated
      } catch (err) {
        console.error('Erro ao cadastrar o produto:', product, err)
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao cadastrar o produto ${product.name}`)
        throw err
      }
    },
    async update (product: IProduct): Promise<IProduct> {
      $loading.show(`Atualizando produto "${product.name}"...`)
      try {
        // Buscando produto na API e state
        const productUpdated: IProduct = await $api.products.update(product)
        // Atualizando no state
        this.products[this.products.findIndex((productRow: IProduct) => productRow.id === productUpdated.id)] = productUpdated

        $loading.hide()
        $notify.success(`O produto "${product.name}" foi atualizado com sucesso`)
        return productUpdated
      } catch (err) {
        console.error('Erro ao atualizar o produto: ', product, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao atualizar o produto ${product.name}`)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      $loading.show('Deletando produto...')
      try {
        // Deletando produto na API e state
        const deleted = await $api.products.delete(id)
        // Deletando no state
        this.products.splice(this.products.findIndex((productRow: IProduct) => productRow.id === id), 1)

        $loading.hide()
        $notify.success('O produto foi deletado com sucesso')
        return deleted
      } catch (err) {
        console.error(`Erro ao deletar o produto de ID ${id}: `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao deletar o produto de ID "${id}"`)
        throw err
      }
    }
  },
  persist: true
})
