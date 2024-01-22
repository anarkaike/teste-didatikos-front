<template>
  <div>
    <q-form @submit.prevent="methods.save">
      <div class="text-h6 q-ml-sm q-mb-md">
        {{formData.id?'Atualizando Produto':'Novo Produto'}}
      </div>

      <!-- CAMPO NOME -->
      <q-input
        rounded
        standout
        v-model="formData.name"
        label="Nome do produto"
        class="q-mb-md"
        hide-bottom-space
        autocomplete="off"
        dense
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || 'Digite o nome do produto'
        ]"
      >
        <template #prepend>
          <icon icon="fluent-mdl2:product-variant" />
        </template>
      </q-input>

      <!-- CAMPO PREÇO -->
      <q-input
        rounded
        standout
        v-model="formData.price"
        label="Preço do produto"
        class="q-mb-md"
        hide-bottom-space
        autocomplete="off"
        mask="#,##"
        fill-mask="0"
        reverse-fill-mask
        prefix="R$ "
        dense
        :rules="[
          val => (val && val.length > 0) || 'Digite o preço do produto',
          val => (Number(val.replace(',', '.')) < 999999.99) || 'Máx permitido é 999999,99'
        ]"
      >
        <template #prepend>
          <icon icon="material-symbols-light:price-change-outline" />
        </template>
      </q-input>

      <!-- CAMPO MARCA -->
      <q-select
        label="Marca"
        v-model="formData.brand_id"
        :options="brands"
        :loading="brands.length === 0"
        options-dense
        options-selected-class="#c6c9c1"
        emit-value
        map-options
        option-value="id"
        option-label="label"
        rounded
        standout
        dense
        class="q-mb-md"
      >
        <template #prepend>
          <q-icon name="badge" />
        </template>
      </q-select>

      <!-- CAMPO ESTOQUE -->
      <q-input
        rounded
        standout
        v-model="formData.stock"
        label="Estoque do produto"
        hide-bottom-space
        class="q-mb-md"
        autocomplete="off"
        dense
        mask="#,##"
        fill-mask="0"
        reverse-fill-mask
        :rules="[
          val => (val && val.length > 0) || 'Digite o estoque do produto',
          val => (Number(val.replace(',', '.')) < 999999.99) || 'Máx permitido é 999999,99'
        ]"
      >
        <template #prepend>
          <icon icon="octicon:number-24" />
        </template>
      </q-input>

      <!-- CAMPO CIDADE -->
      <q-select
        label="Cidade"
        v-model="formData.city_id"
        :options="cities"
        :loading="cities.length === 0"
        options-dense
        options-selected-class="#c6c9c1"
        emit-value
        map-options
        option-value="id"
        option-label="label"
        rounded
        standout
        dense
        class="q-mb-md"
      >
        <template #prepend>
          <q-icon name="badge" />
        </template>
      </q-select>

      <div class="row q-mt-lg q-mb-md">
        <div class="col-6 q-pr-sm">
          <q-btn unelevated dense fab-mini type="submit" class="full-width" @click="methods.reset">
            Cancelar
          </q-btn>
        </div>
        <div class="col-6 q-pl-sm">
          <q-btn type="submit" dense fab-mini class="btn-primary full-width">
            {{formData.id?'Atualizar':'Cadastrar'}}
          </q-btn>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onBeforeMount, watchEffect } from 'vue'
import { IProduct, IOption } from '@/interfaces'
import { $stores } from '@/stores/all'

const emit = defineEmits([
  'on-create',
  'on-update',
  'on-reset'
])

const cities: Ref<IOption[]> = ref([])
const brands: Ref<IOption[]> = ref([])

// PROPS ----------------------------------------
const props = withDefaults(defineProps<{
  product?: IProduct
}>(), {})
const formData: Ref<IProduct> = ref(props.product ?? {})
const methods = {
  save () {
    const method = formData.value.id ? 'update' : 'create'
    const data = {
      ...formData.value,
      ...{
        price: Number(String(formData.value.price).replace(',', '.')),
        stock: Number(String(formData.value.stock).replace(',', '.'))
      }
    }
    delete data.created_at
    delete data.created_by
    delete data.updated_at
    delete data.updated_by
    delete data.city_name
    delete data.brand_name
    $stores.products[method](data).then((value: IProduct) => {
      emit(formData.value.id ? 'on-update' : 'on-create', value)
      methods.reset()
    })
  },
  reset () {
    formData.value = {} as IProduct
    emit('on-reset', formData.value)
  }
}

watchEffect(
  () => {
    formData.value = props.product as IProduct
  }
)

onBeforeMount(() => {
  $stores.cities.getOptions().then((res: IOption[]) => {
    cities.value = res
  })
  $stores.brands.getOptions().then((res: IOption[]) => {
    brands.value = res
  })
})
</script>
