<template>
  <q-page>
    <div class="ctn-fast-links">
      <div class="q-pl-xs text-center">LINKS RÁPIDOS:</div>
      <div class="row justify-center">
        <div class="col-6 col-sm-3 col-md-2 link-products" @click="router.push({ name: 'products' })">
          <div class="flex justify-around">
            <icon class="q-mr-md" icon="fluent-mdl2:product-variant" />
            <span class="col-grow">Produtos</span>
          </div>
        </div>
        <div class="col-6 col-sm-3 col-md-2 link-brands" @click="router.push({ name: 'brands' })">
          <div class="flex justify-around">
              <icon class="q-mr-md" icon="tabler:brand-nem" />
              <span class="col-grow">Marcas</span>
          </div>
        </div>
        <div class="col-6 col-sm-3 col-md-2 link-cities" @click="router.push({ name: 'cities' })">
          <div class="flex justify-around">
            <icon class="q-mr-md" icon="solar:city-bold" />
            <span class="col-grow">Cidades</span>
          </div>
        </div>
        <div class="col-6 col-sm-3 col-md-2 link-users" @click="router.push({ name: 'users' })">
          <div class="flex justify-around">
            <icon class="q-mr-md" icon="heroicons:user-solid" />
            <span class="col-grow">Usuários</span>
          </div>
        </div>
        <div class="col-6 col-sm-3 col-md-2 link-logout" @click="$stores.auth.logout(router)">
          <div class="flex justify-around">
            <icon class="q-mr-md" icon="tabler:door-exit" />
            <span class="col-grow">Sair</span>
          </div>
        </div>
      </div>
    </div>

    <q-separator class="q-mt-md" />
    <div class="q-mt-md">
      <div class="title-bi-home q-my-sm text-center text-bold">BI de Produtos • Contagem, Média, Somatória, Maior e Menor</div>
      <div class="row">
        <div class="col-12 col-md-6 q-px-md">
          <DkBiProduct v-if="$stores.products.products && $stores.products.products.length > 0" :products="$stores.products.products" type="brand" :categories="$stores.brands.options" />
        </div>
        <div class="col-12 col-md-6 q-px-md">
          <DkBiProduct v-if="$stores.products.products && $stores.products.products.length > 0" :products="$stores.products.products" type="city" :categories="$stores.cities.options" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { $stores } from '@/stores/all'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { DkBiProduct } from '@/components'

const router = useRouter()

onBeforeMount(() => {
  $stores.products.listAll()
  $stores.brands.getOptions()
  $stores.cities.getOptions()
})
</script>

<style lang="scss">
.title-bi-home {
  color: #bf0209;
  font-size: 30px;
  font-weight: 100;
}
.ctn-fast-links {
  margin-top: 30px;
  > div {
    margin-top: 10px;
    > div {
      > div {
        margin: 0px 5px 5px 0px;
        background-color: #CCC;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        transition: transform linear 0.1s, background-color linear 0.3s;
        cursor: pointer;
        font-size: 20px;
        height: 100%;
        .iconify {
          transition: transform linear 0.1s;
          font-size: 38px;
          min-width: 38px;
          min-height: 38px;
        }
        > span {
          padding-top: 5px;
        }
        &:hover {
          transform: scale(1.03);
          .iconify {
            transform: scale(1.1);
          }
        }
      }
      &.link-products {
        > div {
          background-color: #e2ceee;
          border: 1px solid #cea6e7;
          &:hover {
            background-color: #cea6e7;
          }
        }
      }
      &.link-brands {
        > div {
          background-color: #efd5cb;
          border: 1px solid #ECAB91;
          &:hover {
            background-color: #ECAB91;
          }
        }
      }
      &.link-cities {
        > div {
          background-color: #ced6dd;
          border: 1px solid #AFBAC4;
          &:hover {
            background-color: #AFBAC4;
          }
        }
      }
      &.link-users {
        > div {
          background-color: #f8e1b5;
          border: 1px solid #eac070;
          &:hover {
            background-color: #eac070;
          }
        }
      }
      &.link-logout {
        > div {
          background-color: #f6c3c4;
          border: 1px solid #e07d82;
          &:hover {
            background-color: #e07d82;
          }
        }
      }
    }
  }
}
</style>
