import AuthApiService from './api/AuthApiService'
import UsersApiService from './api/UsersApiService'
import CitiesApiService from './api/CitiesApiService'
import BrandsApiService from './api/BrandsApiService'
import ProductsApiService from './api/ProductsApiService'

export const $api = {
  auth: new AuthApiService(),
  users: new UsersApiService(),
  cities: new CitiesApiService(),
  brands: new BrandsApiService(),
  products: new ProductsApiService()
}
