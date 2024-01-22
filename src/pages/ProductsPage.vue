<template>
  <q-page>
    <div class="title-page q-mb-md flex justify-between">
      <span>Gestão de <strong>Produtos</strong></span>

      <q-chip class="col-auto q-px-md text-bold chip-title">
        Total de &nbsp; <strong>{{productsFiltered.length}} produtos</strong>
      </q-chip>
    </div>
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="q-mr-md-lg q-mb-md  ctn-product-form">
          <div>
            <DkProductForm :product="productForEdit" @on-reset="methods.onCancelEdit" />
          </div>
          <div class="q-mt-md">
            <div class="title-bi q-my-sm text-center text-bold">BI • Contagem, Média, Somatória, Maior e Menor</div>
            <DkBiProduct :products="products" type="brand" />
            <DkBiProduct :products="products" type="city" />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 ctn-product-list">
        <div>
          <DkProductList
            :product-for-edit="productForEdit"
            @on-edit="methods.onEdit"
            @on-products-filtered="methods.updateProductFiltered"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onBeforeMount, ref, Ref } from 'vue'
import { $stores } from '@/stores/all'
import { IProduct } from '@/interfaces'
import { DkProductForm, DkProductList, DkBiProduct } from '@/components'
import { $bi } from '@/composables'

const productForEdit: Ref<IProduct> = ref({})
const useFiltered: Ref<boolean> = ref(true)
const productsFiltered: Ref<IProduct[]> = ref([])

// Obtem os produtos filtrados ou não dependendo do checkbox
const products = computed(() => useFiltered.value ? productsFiltered.value : $stores.products.list)

// Dados de BI por marca
const sumPriceByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.sums.byBrand(products.value, 'price'))
const sumStockByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.sums.byBrand(products.value, 'stock'))
const totalsByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.totals.byBrand(products.value))
const averagesByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.avarages.byBrand(products.value, 'price'))
const maxPriceInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.max.byBrand(products.value, 'price'))
const maxStockInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.max.byBrand(products.value, 'stock'))
const minPriceInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.min.byBrand(products.value, 'price'))
const minStockInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.min.byBrand(products.value, 'stock'))
// Dados de BI por cidade

const sumPriceByCities: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.sums.byCity(products.value, 'price'))
const sumStockByCities: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.sums.byCity(products.value, 'stock'))
const totalsByCities: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.totals.byCity(products.value))
const averagesByCities: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.avarages.byCity(products.value, 'price'))
const maxPriceInCities: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.max.byCity(products.value, 'price'))
const maxStockInCities: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.max.byCity(products.value, 'stock'))
const minPriceInCities: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.min.byCity(products.value, 'price'))
const minStockInCities: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.min.byCity(products.value, 'stock'))

const methods = {
  onEdit (product: IProduct) {
    productForEdit.value = product
  },
  onCancelEdit (productReseted: IProduct) {
    productForEdit.value = productReseted
  },
  updateProductFiltered (products: IProduct[]) {
    productsFiltered.value = products
  }
}

onBeforeMount(() => {
  $stores.products.listAll()
  $stores.brands.getOptions()
  $stores.cities.getOptions()
})
</script>

<style lang="scss" scoped>
.ctn-product-form,
.ctn-product-list {
  > div {
    background-color: rgba(255, 255, 255, 0.7);
    padding: 10px;
    border-radius: 20px;
  }
}
.ctn-product-form {
  > div {
  }
}
.ctn-product-list {

}
.box-bi {
  max-height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05) inset;
  border-radius: 5px;
  padding: 5px;
}
.title-bi {
  color: #C10209;
  .q-chip {
    color: #FFFFFF;
    background-color: #c10209;
    font-size: 12px;
  }
}
</style>
