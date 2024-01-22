import { EBiProductCalculateColumns } from '@/enums'
import { IBrand, ICity, IProduct } from '@/interfaces'
import { brandsStore } from '@/stores/brands-store'
import { citiesStore } from '@/stores/cities-store'

export default function calculateMinBiOfProducts () {
  const inAll = (products: IProduct[], column: EBiProductCalculateColumns): IProduct => {
    return products.reduce(
      (min: IProduct, product: IProduct) => {
        return (Object.keys(min).length === 0 || Number(product[column] ?? 0) < Number(min[column] ?? 0)) ? product : min
      }, {}
    )
  }

  const byBrands = (products: IProduct[], column: EBiProductCalculateColumns, brands: IBrand[]|null = null): {[key: number]: IProduct} => {
    const min: {[key: number]: IProduct} = []
    brands = brands || brandsStore().list || []
    brands.forEach((brand: IBrand) => {
      min[brand.id as number] = products.reduce(
        (min: IProduct, product: IProduct) => {
          return ((Object.keys(min).length === 0 || Number(product[column] ?? 0) < Number(min[column] ?? 0)) && Number(brand.id) === Number(product.brand_id)) ? product : min
        }, {}
      )
    })
    return min
  }

  const byCities = (products: IProduct[], column: EBiProductCalculateColumns, cities: ICity[]|null = null): {[key: number]: IProduct} => {
    const min: {[key: number]: IProduct} = []
    cities = cities || citiesStore().list || []
    cities.forEach((city: ICity) => {
      min[city.id as number] = products.reduce(
        (min: IProduct, product: IProduct) => {
          return ((Object.keys(min).length === 0 || Number(product[column] ?? 0) < Number(min[column] ?? 0)) && Number(city.id) === Number(product.city_id)) ? product : min
        }, {}
      )
    })
    return min
  }

  return {
    inAll,
    byBrands,
    byCities
  }
}
