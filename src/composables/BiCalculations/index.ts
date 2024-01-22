import {
  calculateTotalsBiOfProducts,
  calculateSumsBiOfProducts,
  calculateAvaragesBiOfProducts,
  calculateMinBiOfProducts,
  calculateMaxBiOfProducts
} from './products'

export const $bi = {
  products: {
    totals: {
      byCity: calculateTotalsBiOfProducts().byCities,
      byBrand: calculateTotalsBiOfProducts().byBrands
    },
    sums: {
      inAll: calculateSumsBiOfProducts().inAll,
      byCity: calculateSumsBiOfProducts().byCities,
      byBrand: calculateSumsBiOfProducts().byBrands
    },
    avarages: {
      inAll: calculateAvaragesBiOfProducts().inAll,
      byCity: calculateAvaragesBiOfProducts().byCities,
      byBrand: calculateAvaragesBiOfProducts().byBrands
    },
    min: {
      inAll: calculateMinBiOfProducts().inAll,
      byCity: calculateMinBiOfProducts().byCities,
      byBrand: calculateMinBiOfProducts().byBrands
    },
    max: {
      inAll: calculateMaxBiOfProducts().inAll,
      byCity: calculateMaxBiOfProducts().byCities,
      byBrand: calculateMaxBiOfProducts().byBrands
    }
  }
}
