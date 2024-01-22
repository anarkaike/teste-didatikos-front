<template>
  <q-header class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="$stores.auth.menu_opened=!$stores.auth.menu_opened" />

      <q-toolbar-title class="col-auto cursor-pointer" @click="router.push({ name: 'home' })">
        <img src="/imgs/logo.png" height="35" class="dk-logo" />
      </q-toolbar-title>

      <q-toolbar-title>
        <div class="title-welcome text-center">Bem Vindo, <strong>{{$stores.auth.user?.name}}</strong></div>
      </q-toolbar-title>

      <div class="q-gutter-sm row items-center no-wrap col-auto">
        <q-btn round dense flat color="grey-8" icon="video_call" v-if="$q.screen.gt.sm">
          <q-tooltip>Create a video or post</q-tooltip>
        </q-btn>
        <DkHeaderApps />
        <DkHeaderMessages />
        <DkHeaderNotifications />
        <DkHeaderAvatar />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { DkHeaderAvatar, DkHeaderApps, DkHeaderMessages, DkHeaderNotifications } from './'
import { $stores } from '@/stores/all'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<style lang="scss" scoped>
.title-welcome {
  font-size: 35px;
  font-weight: 100;
  padding-left: 150px;
  strong {
    font-weight: 200;
  }
}
.q-header {
  background-color: #FFF !important;
  color: #666 !important;
  .dk-logo {
    margin-bottom: -10px;
  }
}
</style>
