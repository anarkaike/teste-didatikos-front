<template>
  <div>
    <q-form @submit.prevent="methods.save">
      <div class="text-h6 q-ml-sm title-form flex justify-between" @click="opendForm=!opendForm">
        <span>{{formData.id?'Atualizando Cidade':'Novo Cidade'}}</span>
        <icon :icon="opendForm || formData.id?'icon-park-outline:up-c':'icon-park-outline:down-c'" />
      </div>

      <div v-show="opendForm || formData.id" class=" q-mt-md">
        <!-- CAMPO NOME -->
        <q-input
          rounded
          standout
          v-model="formData.name"
          label="Nome do cidade"
          class="q-mb-md"
          hide-bottom-space
          autocomplete="off"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Digite o nome da cidade'
          ]"
        >
          <template #prepend>
            <icon icon="solar:city-bold" />
          </template>
        </q-input>

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
import { ICity } from '@/interfaces'

const emit = defineEmits([
  'on-create',
  'on-update',
  'on-reset'
])

// PROPS ----------------------------------------
const props = withDefaults(defineProps<{
  city?: ICity
}>(), {})
const formData: Ref<ICity> = ref(props.city ?? {})
const opendForm: Ref<boolean> = ref(true)
const methods = {
  save () {
    const method = formData.value.id ? 'update' : 'create'
    $stores.cities[method](formData.value).then((value: ICity) => {
      emit(formData.value.id ? 'on-update' : 'on-create', value)
      methods.reset()
    })
  },
  reset () {
    // opendForm.value = false
    formData.value = {} as ICity
    emit('on-reset', formData.value)
  }
}

watchEffect(
  () => {
    formData.value = props.city as ICity
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
