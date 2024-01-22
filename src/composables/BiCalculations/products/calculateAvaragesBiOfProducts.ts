import { IBrand, ICity, IProduct } from '@/interfaces'
import { brandsStore } from '@/stores/brands-store'
import { citiesStore } from '@/stores/cities-store'
import { $bi } from '@/composables'

export default function calculateAvaragesBiOfProducts () {
  const inAll = (products: IProduct[], column: 'price'|'stock') => {
    return $bi.products.sums.inAll(products, column) / products.length
  }

  const byBrands = (products: IProduct[], column: 'price'|'stock', brands: IBrand[]|null = null) => {
    brands = brands || brandsStore().list || []
    const sumByBrands = $bi.products.sums.byBrand(products, column, brands)
    const totalsByBrands = $bi.products.totals.byBrand(products, brands)

    const averages: {[key: number]:number} = []
    brands.forEach((brand: IBrand) => {
      averages[brand.id as number] = Number(sumByBrands[brand.id as number]) / Number(totalsByBrands[brand.id as number])
    })
    return averages
  }

  const byCities = (products: IProduct[], column: 'price'|'stock', cities: ICity[]|null = null) => {
    cities = cities || citiesStore().list || []
    const sumByBrands = $bi.products.sums.byBrand(products, column, cities)
    const totalsByBrands = $bi.products.totals.byBrand(products, cities)
    const averages: {[key: number]:number} = []
    cities.forEach((city: ICity) => {
      averages[city.id as number] = Number(sumByBrands[city.id as number]) / Number(totalsByBrands[city.id as number])
    })
    return averages
  }

  return {
    inAll,
    byBrands,
    byCities
  }
}
