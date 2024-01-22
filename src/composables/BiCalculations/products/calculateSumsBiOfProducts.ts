import { IBrand, ICity, IProduct } from '@/interfaces'
import { brandsStore } from '@/stores/brands-store'
import { citiesStore } from '@/stores/cities-store'

export default function calculateSumsBiOfProducts () {
  const inAll = (products: IProduct[], column: 'price'|'stock'): number => {
    return products.reduce(
      (s: number, product: IProduct): number => s + (product[column] ?? 0), 0
    )
  }

  const byBrands = (products: IProduct[], column: 'price'|'stock', brands: IBrand[]|null = null): {[key: number]: number} => {
    const sums: {[key: number]: number} = {}
    brands = brands || brandsStore().list
    brands.forEach((brand: IBrand) => {
      sums[brand.id as number] = products.reduce(
        (s: number, product: IProduct): number => product.brand_id === brand.id ? s + (product[column] ?? 0) : s, 0
      )
    })
    return sums
  }
  const byCities = (products: IProduct[], column: 'price'|'stock', cities: ICity[]|null = null): {[key: number]: number} => {
    const sums: {[key: number]: number} = {}
    cities = cities || citiesStore().list
    cities.forEach((city: ICity) => {
      sums[city.id as number] = products.reduce(
        (s: number, product: IProduct): number => product.city_id === city.id ? s + (product[column] ?? 0) : s, 0
      )
    })
    return sums
  }

  return {
    inAll,
    byBrands,
    byCities
  }
}
