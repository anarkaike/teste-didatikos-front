<template>
  <div>
    <q-form @submit.prevent="methods.save">
      <div class="text-h6 q-ml-sm title-form flex justify-between" @click="opendForm=!opendForm">
        <span>{{formData.id?'Atualizando Produto':'Novo Produto'}}</span>
        <icon :icon="opendForm || formData.id?'icon-park-outline:up-c':'icon-park-outline:down-c'" />
      </div>

      <div v-show="opendForm || formData.id" class=" q-mt-md">
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
          :options="$stores.brands.options"
          :loading="$stores.brands.loading"
          options-dense
          options-selected-class="#c6c9c1"
          emit-value
          map-options
          hide-bottom-space
          option-value="id"
          option-label="label"
          rounded
          standout
          dense
          class="q-mb-md"
          lazy-rules
          :rules="[
            val => (val && val > 0) || 'Escolha a marca'
          ]"
        >
          <template #prepend>
            <icon icon="tabler:brand-nem" />
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
          :options="$stores.cities.options"
          :loading="$stores.cities.loading"
          options-dense
          options-selected-class="#c6c9c1"
          emit-value
          map-options
          hide-bottom-space
          option-value="id"
          option-label="label"
          rounded
          standout
          dense
          class="q-mb-md"
        >
          <template #prepend>
            <icon icon="solar:city-linear" />
          </template>
        </q-select>

        <div class="row q-mt-lg q-mb-md">
          <div class="col-6 q-pr-sm">
            <q-btn unelevated dense fab-mini class="full-width" @click="methods.reset">
              <icon :icon="formData.id?'tabler:pencil-cancel':'ant-design:clear-outlined'" class="q-mr-md" style="margin-left: -10px;" />
              {{formData.id?'Cancelar':'Limpar'}}
            </q-btn>
          </div>
          <div class="col-6 q-pl-sm">
            <q-btn type="submit" dense fab-mini class="btn-primary full-width very-effect-scale-sm">
              {{formData.id?'Atualizar':'Cadastrar'}}
              <icon icon="lets-icons:add-round" class="q-ml-md" style="margin-right: -10px;" />
            </q-btn>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, watchEffect } from 'vue'
import { $stores } from '@/stores/all'
import { IProduct } from '@/interfaces'

const emit = defineEmits([
  'on-create',
  'on-update',
  'on-reset'
])

// PROPS ----------------------------------------
const props = withDefaults(defineProps<{
  product?: IProduct
}>(), {})
const formData: Ref<IProduct> = ref(props.product ?? {})
const opendForm: Ref<boolean> = ref(false)
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
    $stores.products[method](data).then((value: IProduct) => {
      emit(formData.value.id ? 'on-update' : 'on-create', value)
      methods.reset()
    })
  },
  reset () {
    opendForm.value = false
    formData.value = {} as IProduct
    emit('on-reset', formData.value)
  }
}

watchEffect(
  () => {
    formData.value = props.product as IProduct
  }
)
</script>

<style lang="scss">
.title-form {
  cursor: pointer;
  transition: color 0.1s linear;
  .iconify {
    font-size: 33px;
    min-width: 33px;
    min-height: 33px;
    color: #CCC;
    transition: transform 0.1s linear, color 0.1s linear;
  }
  &:hover {
    color: #bf0209;
    .iconify {
      color: #bf0209;
      transform: scale(1.2);
    }
  }
}
</style>
