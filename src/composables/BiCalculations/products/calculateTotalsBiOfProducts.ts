import { IBrand, ICity, IProduct } from '@/interfaces'
import { brandsStore } from '@/stores/brands-store'
import { citiesStore } from '@/stores/cities-store'

export default function calculateTotalsBiOfProducts () {
  const byBrands = (products: IProduct[], brands: IBrand[]|null = null): {[key: number]: number} => {
    const totals: {[key: number]: number} = []
    brands = brands || brandsStore().list || []
    brands.forEach((brand: IBrand) => {
      totals[brand.id as number] = products.reduce(
        (s: number, product: IProduct): number => Number(product.brand_id) === Number(brand.id) ? s + 1 : s, 0
      )
    })
    return totals
  }

  const byCities = (products: IProduct[], cities: ICity[]|null = null): {[key: number]: number} => {
    const totals: {[key: number]: number} = []
    cities = cities || citiesStore().list || []
    cities.forEach((city: ICity) => {
      totals[city.id as number] = products.reduce(
        (s: number, product: IProduct): number => Number(product.city_id) === Number(city.id) ? s + 1 : s, 0
      )
    })
    return totals
  }

  return {
    byBrands,
    byCities
  }
}
