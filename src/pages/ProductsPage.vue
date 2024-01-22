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
            <DkBiProduct :products="products" type="brand" :categories="$stores.brands.options" />
            <DkBiProduct :products="products" type="city" :categories="$stores.cities.options" />
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
import { computed, onBeforeMount, ref, Ref } from 'vue'
import { $stores } from '@/stores/all'
import { IProduct } from '@/interfaces'
import { DkProductForm, DkProductList, DkBiProduct } from '@/components'

const productForEdit: Ref<IProduct> = ref({})
const useFiltered: Ref<boolean> = ref(true)
const productsFiltered: Ref<IProduct[]> = ref([])
const products = computed(() => useFiltered.value ? productsFiltered.value : $stores.products.list)
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
</style>
