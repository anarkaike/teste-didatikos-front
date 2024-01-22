<template>
  <q-btn round dense flat color="grey-8" icon="message" v-if="$q.screen.gt.sm">
    <q-tooltip>Messages</q-tooltip>
    <q-menu>

      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <q-chat-message
            :text="['Have you seen Quasar?']"
            sent
            text-color="white"
            bg-color="primary"
          >
            <template v-slot:name>me</template>
            <template v-slot:stamp>7 minutes ago</template>
            <template v-slot:avatar>
              <img
                class="q-message-avatar q-message-avatar--sent"
                src="https://cdn.quasar.dev/img/avatar4.jpg"
              >
            </template>
          </q-chat-message>

          <q-chat-message
            bg-color="amber"
          >
            <template v-slot:name>Mary</template>
            <template v-slot:avatar>
              <img
                class="q-message-avatar q-message-avatar--received"
                src="https://cdn.quasar.dev/img/avatar2.jpg"
              >
            </template>

            <div>
              Already building an app with it...
              <img src="https://cdn.quasar.dev/img/discord-qeart.png" height="50" class="my-emoji">
            </div>

            <q-spinner-dots size="2rem" />
          </q-chat-message>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>
