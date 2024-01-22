<template>
  <q-btn unelevated color="negative" round icon="delete"  dense class="q-ml-xs very-effect-scale-xl" @click="methods.onClick">
    <q-tooltip>Clique para deletar</q-tooltip>
  </q-btn>
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
