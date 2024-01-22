import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { IBrand, IOption } from '@/interfaces'

export const brandsStore = defineStore('brandsStore', {
  state: () => ({
    brands: [] as IBrand[],
    brandOptions: null as IOption[] | null,
    loading: false as boolean
  }),
  getters: {
    list: (state) => {
      return state.brands
    },
    options: (state) => {
      return state.brandOptions
    }
  },
  actions: {
    async listAll (): Promise<IBrand[]> {
      try {
        this.loading = true
        // Buscando marcas na API
        if (this.brands.length === 0) {
          this.brands = await $api.brands.listAll()
        }
        setTimeout(async () => {
          // Chamo de forma asyncrona para atualizar o store posteriormente
          this.loading = true
          this.brands = await $api.brands.listAll()
          this.loading = false
        }, 500)

        this.loading = false
        return this.brands
      } catch (err) {
        console.error('Erro ao listar as marcas: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao listar as marcas')
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      try {
        if (!this.brandOptions) {
          // Buscando marcas e formatando de saida
          const brands = await this.listAll()

          // Remontando retorno para preenchimento de selects
          this.brandOptions = brands.map((brand: IBrand) => { return { id: brand.id, label: brand.name } as IOption })
        }

        return this.brandOptions
      } catch (err) {
        console.error('Erro ao listar as marcas para options: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao listar as marcas para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<IBrand> {
      $loading.show('Buscando marcas...')
      try {
        // Buscando marcas no state
        const brands = this.$state.brands.filter((brandRow: IBrand) => brandRow.id === id)
        // Se não encontrar no state busca na API
        let brand: IBrand = brands[0] ?? null
        if (!brand) {
          brand = await $api.brands.getById(id)
        }

        $loading.hide()
        $notify.success(`A marca "${brand.name}" foi carregada com sucesso`)
        return brand
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados da marca de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao carregar os dados da marca de ID ${id}`)
        throw err
      }
    },
    async create (brand: IBrand): Promise<IBrand> {
      $loading.show(`Cadastrando marca "${brand.name}"...`)
      try {
        // Criando marca na API e adicionando ao state
        const brandCreated: IBrand = await $api.brands.create(brand)
        // Removendo do state
        this.brands.unshift(brandCreated)

        $loading.hide()
        $notify.success(`A marca "${brand.name}" foi cadastrada com sucesso`)
        return brandCreated
      } catch (err) {
        console.error('Erro ao cadastrar a marca:', brand, err)
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao cadastrar a marca ${brand.name}`)
        throw err
      }
    },
    async update (brand: IBrand): Promise<IBrand> {
      $loading.show(`Atualizando marca "${brand.name}"...`)
      try {
        // Buscando marca na API e state
        const brandUpdated: IBrand = await $api.brands.update(brand)
        // Atualizando no state
        this.brands[this.brands.findIndex((brandRow: IBrand) => brandRow.id === brandUpdated.id)] = brandUpdated

        $loading.hide()
        $notify.success(`A marca "${brand.name}" foi atualizada com sucesso`)
        return brandUpdated
      } catch (err) {
        console.error('Erro ao atualizar a marca: ', brand, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao atualizar a marca ${brand.name}`)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      $loading.show('Deletando marca...')
      try {
        // Deletando marca na API e state
        const deleted = await $api.brands.delete(id)
        // Deletando no state
        this.brands.splice(this.brands.findIndex((brandRow: IBrand) => brandRow.id === id), 1)

        $loading.hide()
        $notify.success('A marca foi deletada com sucesso')
        return deleted
      } catch (err) {
        console.error(`Erro ao deletar a marca de ID ${id}: `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao deletar a marca de ID "${id}"`)
        throw err
      }
    }
  },
  persist: true
})
