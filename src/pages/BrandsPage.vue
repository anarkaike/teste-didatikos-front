<template>
  <q-page>
    <div class="title-page q-mb-md flex justify-between">
      <span>Gestão de <strong>Marcas</strong></span>

      <q-chip class="col-auto q-px-md text-bold chip-title">
        Total de &nbsp; <strong>{{brandsFiltered.length}} marcas</strong>
      </q-chip>
    </div>
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="q-mr-md-lg q-mb-md  ctn-brand-form">
          <div>
            <DkBrandForm :brand="brandForEdit" @on-reset="methods.onCancelEdit" />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 ctn-brand-list">
        <div>
          <DkBrandList
            :brand-for-edit="brandForEdit"
            @on-edit="methods.onEdit"
            @on-brands-filtered="methods.updateBrandFiltered"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, Ref } from 'vue'
import { $stores } from '@/stores/all'
import { IBrand } from '@/interfaces'
import { DkBrandForm, DkBrandList } from '@/components'

const brandForEdit: Ref<IBrand> = ref({})
const brandsFiltered: Ref<IBrand[]> = ref([])
const methods = {
  onEdit (brand: IBrand) {
    brandForEdit.value = brand
  },
  onCancelEdit (brandReseted: IBrand) {
    brandForEdit.value = brandReseted
  },
  updateBrandFiltered (brands: IBrand[]) {
    brandsFiltered.value = brands
  }
}

onBeforeMount(() => {
  $stores.brands.listAll()
  $stores.brands.getOptions()
  $stores.brands.getOptions()
})
</script>

<style lang="scss" scoped>
.ctn-brand-form,
.ctn-brand-list {
  > div {
    background-color: rgba(255, 255, 255, 0.7);
    padding: 10px;
    border-radius: 20px;
  }
}
</style>
