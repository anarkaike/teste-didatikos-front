<template>
  <q-btn unelevated color="positive" round icon="edit"  dense class="q-ml-xs" @click="methods.onClick" />
</template>

<script lang="ts" setup>
const emit = defineEmits([
  'on-click'
])

const methods = {
  onClick (value: unknown) {
    emit('on-click', value)
  }
}
</script>
