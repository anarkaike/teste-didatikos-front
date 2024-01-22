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
import { onBeforeMount, ref, Ref } from 'vue'
import { $stores } from '@/stores/all'
import { IBrand, IUser } from '@/interfaces'
import { DkUserForm, DkUserList } from '@/components'

const userForEdit: Ref<IUser> = ref({})
const usersFiltered: Ref<IBrand[]> = ref([])
const methods = {
  onEdit (user: IUser) {
    userForEdit.value = user
  },
  onCancelEdit (userReseted: IUser) {
    userForEdit.value = userReseted
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
