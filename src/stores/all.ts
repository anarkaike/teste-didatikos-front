import { authStore } from '@/stores/auth-store'
import { usersStore } from '@/stores/users-store'
import { brandsStore } from '@/stores/brands-store'
import { citiesStore } from '@/stores/cities-store'
import { productsStore } from '@/stores/products-store'

export const $stores = {
  auth: authStore(),
  users: usersStore(),
  brands: brandsStore(),
  cities: citiesStore(),
  products: productsStore()
}
