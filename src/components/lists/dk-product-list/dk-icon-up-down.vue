<template>
  <span>
    <span v-show="props.value1 > props.value2">
      <icon icon="octicon:fold-up-16" class="icon-up-down" color="red" />
      <q-tooltip>{{props.labelUp??'Está acima da média'}}</q-tooltip>
    </span>
    <span v-show="props.value1 < value2">
      <icon icon="octicon:fold-down-16" class="icon-up-down" color="green" />
      <q-tooltip>{{props.labelDown??'Está abaixo da média'}}</q-tooltip>
    </span>
  </span>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  value1?: number,
  value2?: number,
  labelUp?: string,
  labelDown?: string
}>(), {})
</script>
