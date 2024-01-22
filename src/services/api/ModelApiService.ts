import ReadOnlyApiService from '@/services/api/ReadOnlyApiService'
import { AxiosResponse } from 'axios'
import { api } from '@/boot/axios'

export default class ModelApiService extends ReadOnlyApiService {
  async create (data = {}) {
    try {
      this.setToken()
      const res: AxiosResponse = await api.post(this.getUrlForCreate(), data, {
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Credentials': 'true',
          withCredentials: true
        }
      })
      return res.data
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.handleErrors(err)
      throw err
    }
  }

  async update (data: object) {
    try {
      if (!('id' in data)) {
        throw new Error('O ID dve ser enviado para atualizar o registro')
      }
      this.setToken()
      const res: AxiosResponse = await api.put(this.getUrlForUpdate(data.id as number), data, {
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Credentials': 'true',
          withCredentials: true
        }
      })
      return res.data
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.handleErrors(err)
      throw err
    }
  }

  async delete (id: number) {
    try {
      this.setToken()
      const res: AxiosResponse = await api.delete(this.getUrlForDelete(id), {
        withCredentials: true
      })
      return res.data
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.handleErrors(err)
      throw err
    }
  }

  makeFormData (data: object) {
    const formData = new FormData()
    for (const key in data) {
      // Verificar se a propriedade pertence ao objeto diretamente, não aos protótipos
      if (key in data) {
        const value = data[key as keyof object] as object // Usar keyof para garantir a validade da chave
        // Verificar se o valor não é nulo ou indefinido antes de adicioná-lo ao FormData
        if (value !== null && value !== undefined) {
          // Se for um objeto do tipo File, você pode adicionar diretamente
          if (value instanceof File) {
            formData.append(key, value)
          } else if (typeof value === 'object') {
            console.log('Junio valueeee', value)
            // Caso contrário, converte o valor para string e adiciona ao FormData
            for (const kSubValue in value) {
              const subValues = value as number[]
              formData.append(`${key}[]`, String(subValues[kSubValue as unknown as number]))
            }
          } else {
            // Caso contrário, converte o valor para string e adiciona ao FormData
            formData.append(key, String(value))
          }
        }
      }
    }
    return formData
  }
}
