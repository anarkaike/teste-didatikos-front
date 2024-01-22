<template>
  <div>
    <div class="text-h6 q-ml-sm q-mb-sm justify-between flex">
      <span class="col-grow">Listagem de Usuários</span>
    </div>
    <div class="ctn-filter">
      <div class="row">
      <div class="col-12 col-md-4 q-px-xs">
        <q-input
          rounded
          standout
          v-model="filterData.search"
          label="Buscar usuário"
          hide-bottom-space
          autocomplete="off"
          dense
        >
          <template #prepend>
            <icon icon="majesticons:search" />
          </template>
        </q-input>
      </div>
    </div>
    </div>
    <q-table
      class="my-sticky-last-column-table"
      flat
      :rows="usersFiltered"
      compact
      :columns="columns"
      :loading="$stores.users.loading"
      :visible-columns="visibleColumns"
      row-key="id"
      rows-per-page-label="Usuários por página"
      :pagination="{rowsPerPage: 6}"
      :pagination-label="(firstRowIndex: number, endRowIndex: number, totalRowsNumber: number) => `Marca ${firstRowIndex.toString()} ao ${endRowIndex.toString()} de ${totalRowsNumber.toString()}`"
    >

      <!-- TEMPLATE PARA SLOT DE BODY DA TABELA -->
      <template v-slot:body="props">
        <q-tr :props="props" :class="{'editing-user': (userForEdit.id === props.row.id)}">

          <!-- TEMPLATE COLUNA ID -->
          <q-td auto-width key="id" :props="props" @click="methods.onEdit(props.row)" class="cursor-pointer">
            {{props.row.id}}
          </q-td>

          <!-- TEMPLATE COLUNA NAME -->
          <q-td key="name" :props="props" @click="methods.onEdit(props.row)" class="cursor-pointer">
            <div class="text-bold">
              <span>{{props.row.name}} </span>
              <br>
              <span style="color: #666;">{{props.row.manufacturer}} </span>
              <q-chip dense class="chip-green q-ml-md" v-if="userForEdit.id === props.row.id">
                Editando esta usuário
              </q-chip>
            </div>
            <q-tooltip
              class="text-body2 tooltip-gray-mini"
              :offset="[-140, -7]"
              anchor="top end"
              transition-show="scale"
              transition-hide="scale"
            >
              Clique na linha para editar este usuário
              <div v-if="props.row.created_at">
                Criado em
                <strong>{{ $formatting.datetime(props.row.created_at) }}</strong>
              </div>
              <div v-if="props.row.updated_at">
                Atualizado em
                <strong>{{ $formatting.datetime(props.row.updated_at) }}</strong>
              </div>
            </q-tooltip>
          </q-td>

          <!-- TEMPLATE COLUNA ACTIONS -->
          <q-td auto-width key="actions" :props="props">
            <JcGroupBtnForTables
              @on-edit="methods.onEdit(props.row)"
              @on-delete="methods.onDelete(props.row)"
            />
          </q-td>
        </q-tr>
      </template>

      <!-- TEMPLATE SLOT SEM REGISTRO -->
      <template #no-data>
        <div style="padding-top: 20px; padding-bottom: 20px; text-align: center; width: 100%;">
          <div v-if="$stores.users.loading">
            <QSpinnerPuff size="100" />
            <br />
            Carregando usuários
          </div>
          <div v-else>
            Nenhuma Marca contrado
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, Ref, ref, watchEffect } from 'vue'
import { useQuasar, QSpinnerPuff } from 'quasar'
import { $stores } from '@/stores/all'
import { IUser } from '@/interfaces'
import { $formatting, $sanitization } from '@/composables'
import { JcGroupBtnForTables } from '@/components'

interface IFilterData {
  search: string
}

// PROPS ----------------------------------------
const props = withDefaults(defineProps<{
  users?: IUser[],
  userForEdit?: IUser
}>(), {})
const $q = useQuasar()
const filterData: Ref<IFilterData> = ref({ search: '' })
const visibleColumns = computed(() => $q.screen.xs ? ['id', 'name', 'actions'] : ['id', 'name', 'actions'])
const users: Ref<IUser[]> = ref(props.users ?? [])
const columns = ref([
  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])

// Colcoando minusculo e sem acentos para filtragem
const usersFiltered = computed(() => {
  // const key = filterData.value.search.toLowerCase().split(' ')
  const usersFiltered = $stores.users.list.filter((user: IUser) => {
    let found = false
    const columnsForFilter = ['id', 'name']
    columnsForFilter.forEach((column: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const value = $sanitization.forSearch(user[column])
      // key.forEach((partialKey) => {
      if (value?.includes($sanitization.forSearch(filterData.value.search))) found = true
      // })
    })
    return found
  })
  emit('on-users-filtered', usersFiltered)
  return usersFiltered
})

const emit = defineEmits([
  'on-edit',
  'on-users-filtered'
])

watchEffect(() => {
  emit('on-users-filtered', usersFiltered.value)
})

const methods = {
  onEdit (user: IUser): void {
    emit('on-edit', user)
  },
  onDelete (user: IUser): void {
    $q.dialog({
      title: 'Atenção!',
      message: `Deseja realmente excluir a usuário ${user.name}?`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      $stores.users.delete(user.id).then(() => {
        users.value.splice(users.value.findIndex((r: IUser) => r.id === user.id), 1)
      })
    })
  }
}
</script>

<style lang="scss">
.ctn-filter {
  border: 1px solid #F0F0F5;
  border-radius: 25px;
  padding-top: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.04);
  margin-bottom: 10px;
}
.editing-user {
  background-color: rgba(193, 2, 9, 0.007);
  background-image: url('/imgs/bg-editing.png');
  background-size: contain;
}
.my-sticky-last-column-table {
  .user-user {
    color: #999;
  }
  th {
    padding: 0px !important;
  }
  thead tr:last-child th:last-child {
    background-color: rgba(255, 255, 255, 0.9);
  }
  td {
    padding-left: 10px;
    padding-right: 10px;
  }
  td:last-child {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0px !important;
  }
  th:last-child {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0px !important;
    position: sticky !important;
    right: 0 !important;
    z-index: 1;
  }
  th:last-child,
  td:last-child {
    background-color: rgba(255, 255, 255, 0.9);
    position: sticky !important;
    right: 0 !important;
    z-index: 1 !important;
    padding: 5px !important;
  }
  tr:last-child {
    th:last-child {
      -webkit-border-top-left-radius: 20px;
      -moz-border-radius-topleft: 20px;
      border-top-left-radius: 20px;
      background-color: rgba(255, 255, 255, 0.9);
      position: sticky !important;
      right: 0 !important;
      z-index: 1 !important;
      padding-left: 5px !important;
      padding-right: 5px !important;
    }
  }
  td, tr {
    padding: 5px;
    padding-right: 5px !important;
  }
  .q-fab {
    .q-btn--fab {
      padding: 7px !important;
      min-width: 20px !important;
      min-height: 20px !important;
    }
  }
}
strong, u {
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
}
.icon-up-down {
  font-size: 20px;
  min-width: 20px;
  min-height: 20px;
  vertical-align: bottom;
  font-weight: bold;
  margin-left: 5px;
}
</style>
