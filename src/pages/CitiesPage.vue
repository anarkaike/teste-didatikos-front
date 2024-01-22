<template>
  <q-page>
    <div class="title-page q-mb-md flex justify-between">
      <span>Gestão de <strong>Cidades</strong></span>

      <q-chip class="col-auto q-px-md text-bold chip-title">
        Total de &nbsp; <strong>{{citiesFiltered.length}} cidades</strong>
      </q-chip>
    </div>
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="q-mr-md-lg q-mb-md  ctn-city-form">
          <div>
            <DkCityForm :city="cityForEdit" @on-reset="methods.onCancelEdit" />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 ctn-city-list">
        <div>
          <DkCityList
            :city-for-edit="cityForEdit"
            @on-edit="methods.onEdit"
            @on-cities-filtered="methods.updateCityFiltered"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, Ref } from 'vue'
import { $stores } from '@/stores/all'
import { IBrand, ICity } from '@/interfaces'
import { DkCityForm, DkCityList } from '@/components'

const cityForEdit: Ref<ICity> = ref({})
const citiesFiltered: Ref<IBrand[]> = ref([])
const methods = {
  onEdit (city: ICity) {
    cityForEdit.value = city
  },
  onCancelEdit (cityReseted: ICity) {
    cityForEdit.value = cityReseted
  },
  updateCityFiltered (cities: ICity[]) {
    citiesFiltered.value = cities
  }
}

onBeforeMount(() => {
  $stores.cities.listAll()
  $stores.brands.getOptions()
  $stores.cities.getOptions()
})
</script>

<style lang="scss" scoped>
.ctn-city-form,
.ctn-city-list {
  > div {
    background-color: rgba(255, 255, 255, 0.7);
    padding: 10px;
    border-radius: 20px;
  }
}
</style>
