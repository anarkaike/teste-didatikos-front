<template>
  <q-page class="row items-center justify-evenly">
      <q-card class="col-11 col-md-4 col-xl-4 login-box q-pa-lg">
        <div class="text-center">
          <q-img src="/imgs/logo.png" class="dk-logo" />
        </div>
        <div class="title-form-login-register">Cadastre-se</div>
        <q-form class="q-ma-md" @submit.prevent="methods.login">
          <!-- CAMPO NOME -->
          <q-input
            rounded
            standout
            v-model="formData.name"
            label="Nome"
            class="q-mb-md"
            hide-bottom-space
            autocomplete="off"
            lazy-rules
            :rules="[
            val => (val && val.length > 0) || 'Digite seu nome'
          ]"
          >
            <template #prepend>
              <icon icon="fluent-mdl2:user-variant" />
            </template>
          </q-input>

          <q-input
            rounded
            standout
            v-model="formData.email"
            label="Seu email"
            class="q-mb-md"
            autocomplete="off"
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
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Digite sua senha'
            ]"
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

          <q-btn type="submit" fab class="btn-primary full-width q-mb-md">
            Cadastrar
          </q-btn>
          <q-btn unelevated fab class="btn-seconday full-width q-mt-md" @click="router.push({ name: 'login' })">
            Voltar
          </q-btn>
        </q-form>
      </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { $stores } from '@/stores/all'
import { useRouter } from 'vue-router'

interface IFormData {
  email: string,
  password: string,
}
const router = useRouter()
const formData: Ref<IFormData> = ref({} as IFormData)
const pwsVisible: Ref<boolean> = ref(false)

const methods = {
  login () {
    $stores.auth.autoRegister(formData.value, router)
  }
}
</script>

<style scoped lang="scss">
.login-box {
  max-width: 440px;
  min-height: 400px;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.1411764706);
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: transform 0.1s linear;
  .dk-logo {
    display: inline-block;
    width: calc(100% - 53px);
    margin-top: 20px;
    margin-bottom: 20px;
    transition: transform 0.1s linear;
  }
  &:hover {
    transform: scale(1.005);
    .dk-logo {
      transform: scale(1.03);
    }
  }
}
</style>
