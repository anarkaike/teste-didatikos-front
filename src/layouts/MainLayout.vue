<template>
  <q-layout view="hHh lpR fFf">

    <DkHeader />
    <DkMenu />

    <q-page-container>
      <div class="dk-ctn-container">
        <router-view />
      </div>
    </q-page-container>

    <DkFooter />

  </q-layout>
</template>

<script land="ts" setup>
import { DkHeader, DkMenu, DkFooter } from './MainLayout'
</script>
<style lang="scss">
body {
  background-color: #FFF;
  background-image: url('/imgs/fundoLogin.svg');
}
.q-page-container {
  background-image: url('/imgs/fundoLogin.svg');
  .dk-ctn-container {
    background-color: rgb(240, 240, 245, 0.7);
    -webkit-border-top-left-radius: 40px;
    -webkit-border-bottom-left-radius: 40px;
    -moz-border-radius-topleft: 40px;
    -moz-border-radius-bottomleft: 40px;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.04) inset;
    padding: 15px 20px 20px 100px;
  }
}
</style>
