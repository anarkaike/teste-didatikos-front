import { defineStore } from 'pinia'
import { $loading, $notify } from '@/composables'
import { $api } from '@/services/api'
import { ICity, IOption } from '@/interfaces'

export const citiesStore = defineStore('citiesStore', {
  state: () => ({
    cities: [] as ICity[],
    cityOptions: null as IOption[] | null
  }),
  getters: {
    list: (state) => {
      return state.cities
    }
  },
  actions: {
    async listAll (): Promise<ICity[]> {
      try {
        // Buscando cidades na API
        this.cities = await $api.cities.listAll()

        return this.cities
      } catch (err) {
        console.error('Erro ao listar as cidades: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao listar as cidades')
        throw err
      }
    },
    async getOptions (): Promise<IOption[]> {
      try {
        if (!this.cityOptions) {
          // Buscando cidades e formatando de saida
          const cities = await this.listAll()

          // Remontando retorno para preenchimento de selects
          this.cityOptions = cities.map((city: ICity) => { return { id: city.id, label: city.name } as IOption })
        }

        return this.cityOptions
      } catch (err) {
        console.error('Erro ao listar as cidades para options: ', err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? 'Erro ao listar as cidades para preencher campo de opções')
        throw err
      }
    },
    async getById (id: number): Promise<ICity> {
      $loading.show('Buscando cidades...')
      try {
        // Buscando cidades no state
        const cities = this.$state.cities.filter((cityRow: ICity) => cityRow.id === id)
        // Se não encontrar no state busca na API
        let city: ICity = cities[0] ?? null
        if (!city) {
          city = await $api.cities.getById(id)
        }

        $loading.hide()
        $notify.success(`A cidade "${city.name}" foi carregada com sucesso`)
        return city
      } catch (err) {
        $loading.hide()
        console.error(`Erro ao carregar os dados da cidade de ID "${id}": `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao carregar os dados da cidade de ID ${id}`)
        throw err
      }
    },
    async create (city: ICity): Promise<ICity> {
      $loading.show(`Cadastrando cidade "${city.name}"...`)
      try {
        // Criando cidade na API e adicionando ao state
        const cityCreated: ICity = await $api.cities.create(city)
        // Removendo do state
        this.cities.unshift(cityCreated)

        $loading.hide()
        $notify.success(`Cidade "${city.name}" cadastrada com sucesso`)
        return cityCreated
      } catch (err) {
        console.error('Erro ao cadastrar a cidade:', city, err)
        $loading.hide()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao cadastrar a cidade ${city.name}`)
        throw err
      }
    },
    async update (city: ICity): Promise<ICity> {
      $loading.show(`Atualizando cidade "${city.name}"...`)
      try {
        // Buscando cidade na API e state
        const cityUpdated: ICity = await $api.cities.update(city)
        // Atualizando no state
        this.cities[this.cities.findIndex((cityRow: ICity) => cityRow.id === cityUpdated.id)] = cityUpdated

        $loading.hide()
        $notify.success(`Cidade "${city.name}" atualizada com sucesso`)
        return cityUpdated
      } catch (err) {
        console.error('Erro ao atualizar a cidade: ', city, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao atualizar a cidade ${city.name}`)
        throw err
      }
    },
    async delete (id: number): Promise<boolean> {
      $loading.show('Deletando cidade...')
      try {
        // Deletando cidade na API
        const deleted = await $api.cities.delete(id)
        // Deletando no state
        this.cities.splice(this.cities.findIndex((cityRow: ICity) => cityRow.id === id), 1)

        $loading.hide()
        $notify.success('A cidade deletada com sucesso')
        return deleted
      } catch (err) {
        console.error(`Erro ao deletar a cidade de ID ${id}: `, err)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        $notify.error(err.response?.data?.message ?? err.message ?? `Erro ao deletar a cidade de ID "${id}"`)
        throw err
      }
    }
  },
  persist: true
})
