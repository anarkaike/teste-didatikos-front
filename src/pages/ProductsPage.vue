<template>
  <q-page>
    <div class="title-page q-mb-md flex justify-between">
      <span>Gestão de Produtos</span>

      <q-chip class="col-auto q-px-md text-bold">
        Total de {{productsFiltered.length}} produtos
      </q-chip>
    </div>
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="q-mr-md-lg q-mb-md  ctn-product-form">
          <div>
            <DkProductForm :product="productForEdit" @on-reset="methods.onCancelEdit" />
          </div>
          <div class="q-mt-md">
            <div class="title-bi q-my-sm text-center text-bold">BI • Contagem, Média e Somatória</div>
            <div class="title-bi flex justify-between">
              <span>Por Marca:</span>
              <q-chip dense>{{totalsByBrands.filter((r) => r > 0).length}} marcas</q-chip>
            </div>
            <div class="scroll box-bi q-mb-sm">
              <div v-for="(brand, index) in brands" :key="brand.id">
                <div class="q-mb-md" v-show="totalsByBrands[brand.id] > 0">
                  <strong>{{index+1}} • {{brand.label}}:</strong>
                  <br />
                  Total: {{totalsByBrands[brand.id]}}
                  <br />
                  Somatória: R$ {{sumByBrands[brand.id].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}
                  <br>
                  Média: {{averagesByBrands[brand.id].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}
                </div>
              </div>
            </div>
            <div class="title-bi flex justify-between">
              <span>Por Cidade:</span>
              <q-chip dense>{{totalsByCities.filter((r) => r > 0).length}} cidades</q-chip>
            </div>
            <div class="scroll box-bi">
              <div v-for="(city, index) in cities" :key="city.id">
                <div class="q-mb-md" v-show="totalsByCities[city.id] > 0">
                  <strong>{{index+1}} • {{city.label}}:</strong>
                  <br />
                  Total: {{totalsByCities[city.id]}}
                  <br />
                  Somatória: R$ {{sumByCities[city.id].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}
                  <br>
                  Média: {{averagesByCities[city.id].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}}
                </div>
              </div>
            </div>
            <div class="q-mt-xs" v-show="$stores.products.list.length !== productsFiltered.length">
              <q-checkbox size="xs" color="#CCCCCC" class="q-md-sm text-caption" v-model="useFiltered" :toggle-indeterminate="false" label="Considerar os filtros" />
            </div>
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
import { $stores } from '@/stores/all'
import { computed, ComputedRef, onBeforeMount, ref, Ref } from 'vue'
import { IOption, IProduct } from '@/interfaces'
import { DkProductForm, DkProductList } from '@/components'

const productForEdit: Ref<IProduct> = ref({})
const brands: Ref<IOption[]> = ref([])
const cities: Ref<IOption[]> = ref([])

const useFiltered: Ref<boolean> = ref(true)
const productsFiltered: Ref<IProduct[]> = ref([])

// Obtem os produtos filtrados ou não dependendo do checkbox
const products = computed(() => useFiltered.value ? productsFiltered.value : $stores.products.list)

// Dados de BI por marca
const sumByBrands: ComputedRef<{[key: number]: number}> = computed(() => {
  const sumByBrands: {[key: number]:number} = {}
  brands.value.forEach((brand: IOption) => {
    sumByBrands[brand.id as number] = products.value.reduce((s: number, product: IProduct): number => product.brand_id === brand.id ? s + (product.price ?? 0) : s, 0)
  })
  return sumByBrands
})
const totalsByBrands: ComputedRef<{[key: number]: number}> = computed(() => {
  const totalByBrands: {[key: number]:number} = []
  brands.value.forEach((brand: IOption) => {
    totalByBrands[brand.id as number] = products.value.reduce((s: number, product: IProduct): number => product.brand_id === brand.id ? s + 1 : s, 0)
  })
  return totalByBrands
})
const averagesByBrands: ComputedRef<{[key: number]: number}> = computed(() => {
  const averagesByBrands: {[key: number]:number} = []
  brands.value.forEach((brand: IOption) => {
    averagesByBrands[brand.id as number] = sumByBrands.value[brand.id as number] / totalsByBrands.value[brand.id as number]
  })
  return averagesByBrands
})

// Dados de BI por cidade
const sumByCities = computed(() => {
  const sumByCities: {[key: number]:number} = {}
  cities.value.forEach((city: IOption) => {
    sumByCities[city.id as number] = products.value.reduce((s: number, product: IProduct): number => product.city_id === city.id ? s + (product.price ?? 0) : s, 0)
  })
  return sumByCities
})
const totalsByCities = computed(() => {
  const totalByCities: {[key: number]:string} = []
  cities.value.forEach((city: IOption) => {
    totalByCities[city.id as number] = products.value.reduce((s: number, product: IProduct): number => product.city_id === city.id ? s + 1 : s, 0).toString()
  })
  return totalByCities
})
const averagesByCities: ComputedRef<{[key: number]: number}> = computed(() => {
  const averagesByCities: {[key: number]:number} = []
  cities.value.forEach((city: IOption) => {
    averagesByCities[city.id as number] = Number(sumByCities.value[city.id as number]) / Number(totalsByCities.value[city.id as number])
  })
  return averagesByCities
})

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
  $stores.brands.getOptions().then((res) => {
    brands.value = res
  })
  $stores.cities.getOptions().then((res) => {
    cities.value = res
  })
})
</script>

<style lang="scss" scoped>
.ctn-product-form,
.ctn-product-list {
  > div {
    background-color: rgba(255, 255, 255, 0.7);
    padding: 10px;
    border-radius: 20px;
    min-height: 300px;
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
