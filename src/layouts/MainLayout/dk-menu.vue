<template>
  <q-drawer :breakpoint="500" v-model="menu" persistent behavior="desktop" side="left" overlay :mini-width="90" :mini="$stores.auth.menu_opened">
    <template #default>
      <div class="dk-ctn-menu normal">
        <q-list>

          <q-item clickable v-ripple :to="{ name: 'products' }" @click="$stores.auth.toogleMenu">
            <q-item-section avatar class="col-auto">
              <icon icon="fluent-mdl2:product-variant" class="q-mr-md" />
            </q-item-section>
            <q-item-section>Gerenciar Produtos</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'brands' }" @click="$stores.auth.toogleMenu">
            <q-item-section avatar class="col-auto">
              <icon icon="tabler:brand-nem" class="q-mr-md" />
            </q-item-section>
            <q-item-section>Grenciar Marcas</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'cities' }" @click="$stores.auth.toogleMenu">
            <q-item-section avatar class="col-auto">
              <icon icon="solar:city-bold" class="q-mr-md" />
            </q-item-section>
            <q-item-section>Gerenciar Cidades</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{ name: 'users' }" @click="$stores.auth.toogleMenu">
            <q-item-section avatar class="col-auto">
              <icon icon="heroicons:user-solid" class="q-mr-md" />
            </q-item-section>
            <q-item-section>Gerenciar Usuários</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar class="col-auto">
              <icon icon="tabler:door-exit" class="q-mr-md" />
            </q-item-section>
            <q-item-section>Sair do Sistema</q-item-section>
          </q-item>

        </q-list>
      </div>
    </template>
    <template #mini>
      <div class="dk-ctn-menu mini">
        <q-btn flat fab-mini :to="{ name: 'products' }" :class="{'menu-active': route.name==='products' }">
          <icon icon="fluent-mdl2:product-variant" />
          <q-tooltip class="text-body2 tooltip-red" :offset="[84, -37]"  anchor="bottom right" transition-show="scale" transition-hide="scale">
            Gerenciar Produtos
          </q-tooltip>
        </q-btn>
        <br />
        <q-btn flat fab-mini :to="{ name: 'brands' }" :class="{'menu-active': route.name==='brands' }">
          <icon icon="tabler:brand-nem" />
          <q-tooltip class="text-body2 tooltip-red" :offset="[76, -37]" anchor="bottom end" transition-show="scale" transition-hide="scale">
            Gerenciar Marca
          </q-tooltip>
        </q-btn>
        <br />
        <q-btn flat fab-mini :to="{ name: 'cities' }" :class="{'menu-active': route.name==='cities' }">
          <icon icon="solar:city-bold" />
          <q-tooltip class="text-body2 tooltip-red" :offset="[82, -37]"  anchor="bottom right" transition-show="scale" transition-hide="scale">
            Gerenciar Cidades
          </q-tooltip>
        </q-btn>
        <br />
        <q-btn flat fab-mini :to="{ name: 'users' }" :class="{'menu-active': route.name==='users' }">
          <icon icon="heroicons:user-solid" />
          <q-tooltip class="text-body2 tooltip-red" :offset="[85, -37]"  anchor="bottom right" transition-show="scale" transition-hide="scale">
            Gerenciar Usuários
          </q-tooltip>
        </q-btn>
        <br />
        <q-btn flat fab-mini @click="$stores.auth.logout(router)">
          <icon icon="tabler:door-exit" />
          <q-tooltip class="text-body2 tooltip-red" :offset="[72, -37]"  anchor="bottom right" transition-show="scale" transition-hide="scale">
            Sair do Sistema
          </q-tooltip>
        </q-btn>
      </div>
    </template>
  </q-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { $stores } from '@/stores/all'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const menu = ref(true)
</script>

<style lang="scss" scoped>
.q-router-link--exact-active,
.menu-active {
  color: #C00209 !important;
  background-color: rgba(183, 2, 9, 0.05);
  border: 1px solid rgba(192, 2, 9, 0.07);
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.05) inset !important;
}
.q-item__section--avatar {
  margin-left: -7px;
  padding-right: 0px !important;
}
.q-drawer {
  background-color: rgba(0, 0, 0, 0);
  .dk-ctn-menu {
    background-color: rgba(255, 255, 255, 0.97);
    height: calc(100% - 30px);
    margin: 15px;
    -webkit-border-radius: 35px;
    -moz-border-radius: 35px;
    border-radius: 35px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.01);
    border: 1px solid rgba(0, 0, 0, 0.06);
    padding: 10px 8.5px;
    transition: all linear 0.5s;
    &.normal {
      padding-top: 6px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.09);
    }
    &.mini {
    }
    .q-btn  {
      margin-bottom: 13px;
    }
    .iconify {
      font-size: 23px;
      min-width: 23px;
      min-height: 23px;
      transition: transform 0.1s linear;
    }
    .q-item {
      border-radius: 27px;
      margin-bottom: 5px;
    }
  }
}
.q-item,
.q-btn {
  &:hover {
    .iconify {
      transform: scale(1.1) !important;
    }
  }
}
</style>
