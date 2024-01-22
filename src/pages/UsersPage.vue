<template>
  <q-page>
    <div class="title-page q-mb-md flex justify-between">
      <span>Gestão de <strong>Usuários</strong></span>

      <q-chip class="col-auto q-px-md text-bold chip-title">
        Total de &nbsp; <strong>{{usersFiltered.length}} usuários</strong>
      </q-chip>
    </div>
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="q-mr-md-lg q-mb-md  ctn-user-form">
          <div>
            <DkUserForm :user="userForEdit" @on-reset="methods.onCancelEdit" />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 ctn-user-list">
        <div>
          <DkUserList
            :user-for-edit="userForEdit"
            @on-edit="methods.onEdit"
            @on-users-filtered="methods.updateUserFiltered"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, Ref } from 'vue'
import { $stores } from '@/stores/all'
import { IUser } from '@/interfaces'
import { DkUserForm, DkUserList } from '@/components'

const userForEdit: Ref<IUser> = ref({})
const useFiltered: Ref<boolean> = ref(true)
const usersFiltered: Ref<IUser[]> = ref([])
const users = computed(() => useFiltered.value ? usersFiltered.value : $stores.users.list)
const methods = {
  onEdit (user: IUser) {
    userForEdit.value = user
  },
  onCancelEdit (userReseted: IUser) {
    userForEdit.value = userReseted
  },
  updateUserFiltered (users: IUser[]) {
    usersFiltered.value = users
  }
}

onBeforeMount(() => {
  $stores.users.listAll()
  $stores.users.getOptions()
  $stores.users.getOptions()
})
</script>

<style lang="scss" scoped>
.ctn-user-form,
.ctn-user-list {
  > div {
    background-color: rgba(255, 255, 255, 0.7);
    padding: 10px;
    border-radius: 20px;
  }
}
</style>
