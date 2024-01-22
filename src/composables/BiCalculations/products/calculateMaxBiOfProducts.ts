import { EBiProductCalculateColumns } from '@/enums'
import { IBrand, ICity, IProduct } from '@/interfaces'
import { brandsStore } from '@/stores/brands-store'
import { citiesStore } from '@/stores/cities-store'

export default function calculateMaxBiOfProducts () {
  const inAll = (products: IProduct[], column: EBiProductCalculateColumns): IProduct => {
    return products.reduce(
      (max: IProduct, product: IProduct) => {
        return (Object.keys(max).length === 0 || (product[column] ?? 0) > (max[column] ?? 0)) ? product : max
      }, {}
    )
  }

  const byBrands = (products: IProduct[], column: EBiProductCalculateColumns, brands: IBrand[]|null = null): {[key: number]: IProduct} => {
    const max: {[key: number]: IProduct} = []
    brands = brands || brandsStore().list
    brands.forEach((brand: IBrand) => {
      max[brand.id as number] = products.reduce(
        (max: IProduct, product: IProduct) => {
          return ((Object.keys(max).length === 0 || (product[column] ?? 0) > (max[column] ?? 0)) && brand.id === product.brand_id) ? product : max
        }, {}
      )
    })
    return max
  }

  const byCities = (products: IProduct[], column: EBiProductCalculateColumns, cities: ICity[]|null = null): {[key: number]: IProduct} => {
    const max: {[key: number]: IProduct} = []
    cities = cities || citiesStore().list
    cities.forEach((city: ICity) => {
      max[city.id as number] = products.reduce(
        (max: IProduct, product: IProduct) => {
          return ((Object.keys(max).length === 0 || (product[column] ?? 0) > (max[column] ?? 0)) && city.id === product.city_id) ? product : max
        }, {}
      )
    })
    return max
  }

  return {
    inAll,
    byBrands,
    byCities
  }
}
