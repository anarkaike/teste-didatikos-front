<template>
  <div v-bind="$attrs">
    <span class="xs-hide">
      <jc-btn-edit @on-click="methods.onEdit" class="md-lg-xl" />
      <jc-btn-delete @on-click="methods.onDelete" class="md-lg-xl" />
    </span>
    <q-fab color="primary" icon="keyboard_arrow_left" direction="left" class="sm-hide md-hide lg-hide xl-hide">
      <q-fab-action color="negative" @click="methods.onDelete" icon="delete" />
      <q-fab-action color="secondary" @click="methods.onEdit" icon="edit" />
    </q-fab>
  </div>
</template>

<script lang="ts" setup>
import { JcBtnView, JcBtnEdit, JcBtnDelete } from '@/components'

// CONSTANTES ---------------------------------------------------
// const props = defineProps([])
const emit = defineEmits([
  'on-view',
  'on-edit',
  'on-delete'
])

// METODOS ---------------------------------------------------
const methods = {
  onView (row: unknown) {
    emit('on-view', row)
  },
  onEdit (row: unknown) {
    emit('on-edit', row)
  },
  onDelete (row: unknown) {
    emit('on-delete', row)
  }
}
</script>
