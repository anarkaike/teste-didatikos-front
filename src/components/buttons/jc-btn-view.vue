<template>
  <q-btn unelevated color="info" round icon="preview" class="q-ml-xs" dense v-bind="$attrs" @click="methods.onClick" />
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
