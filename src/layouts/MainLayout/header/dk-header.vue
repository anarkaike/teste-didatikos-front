<template>
  <q-header class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="$stores.auth.menu_opened=!$stores.auth.menu_opened" />

      <q-toolbar-title>
        <img src="/imgs/logo.png" height="35" class="dk-logo" />
      </q-toolbar-title>

      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
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
</script>
<style lang="scss" scoped>
.q-header {
  background-color: #FFF !important;
  color: #666 !important;
  .dk-logo {
    margin-bottom: -10px;
  }
}
</style>
