<template>
  <q-page>
    <div class="title-welcome">Bem Vindo, <strong>{{$stores.auth.user?.name}}</strong></div>

    <div class="ctn-fast-links">
      <div class="q-pl-xs">LINKS RÁPIDOS:</div>
      <div class="row">
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
  </q-page>
</template>

<script setup lang="ts">
import { $stores } from '@/stores/all'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss">
.title-welcome {
  font-size: 35px;
  font-weight: 100;
  strong {
    font-weight: 200;
  }
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
        .iconify {
          transition: transform linear 0.1s;
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
