<template>
  <div>
    <q-form @submit.prevent="methods.save">
      <div class="text-h6 q-ml-sm title-form flex justify-between" @click="opendForm=!opendForm">
        <span>{{formData.id?'Atualizando Usuário':'Novo Usuário'}}</span>
        <icon :icon="opendForm || formData.id?'icon-park-outline:up-c':'icon-park-outline:down-c'" />
      </div>

      <div v-show="opendForm || formData.id" class=" q-mt-md">
        <!-- CAMPO NOME -->
        <q-input
          rounded
          standout
          v-model="formData.name"
          label="Nome do usuário"
          class="q-mb-md"
          hide-bottom-space
          autocomplete="off"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Digite o nome do usuário'
          ]"
        >
          <template #prepend>
            <icon icon="heroicons:user-solid" />
          </template>
        </q-input>

        <q-input
          rounded
          standout
          v-model="formData.email"
          label="Seu email"
          class="q-mb-md"
          autocomplete="off"
          hide-bottom-space
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Digite seu email',
            val => (/^[A-Za-z0-9+_.-]+@([A-Za-z0-9+_-])+\.([A-Za-z0-9+_-])+$/.test(val)) || 'Email digitado é inválido'
          ]"
          type="email"
        >
          <template #prepend>
            <q-icon name="alternate_email" />
          </template>
        </q-input>
        <q-input
          rounded
          standout
          v-model="formData.password"
          :type="pwsVisible ? 'text' : 'password'"
          label="Senha"
          class="q-mb-md"
          autocomplete="off"
          hide-bottom-space
        >
          <template #prepend>
            <q-icon name="lock" color="#BE020A" />
          </template>
          <template #append>
            <q-icon
              :name="pwsVisible ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="pwsVisible = !pwsVisible"
            />
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
import { IUser } from '@/interfaces'

const emit = defineEmits([
  'on-create',
  'on-update',
  'on-reset'
])

// PROPS ----------------------------------------
const props = withDefaults(defineProps<{
  user?: IUser
}>(), {})
const pwsVisible: Ref<boolean> = ref(false)
const formData: Ref<IUser> = ref(props.user ?? {})
const opendForm: Ref<boolean> = ref(true)
const methods = {
  save () {
    const method = formData.value.id ? 'update' : 'create'
    $stores.users[method](formData.value).then((value: IUser) => {
      emit(formData.value.id ? 'on-update' : 'on-create', value)
      methods.reset()
    })
  },
  reset () {
    // opendForm.value = false
    formData.value = {} as IUser
    emit('on-reset', formData.value)
  }
}

watchEffect(
  () => {
    formData.value = props.user as IUser
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
