<template>
  <q-btn round dense flat color="grey-8" icon="notifications">
    <q-badge color="red" text-color="white" floating>
      2
    </q-badge>
    <q-tooltip>Notifications</q-tooltip>
    <q-menu>
      <q-slide-item left-color="red" right-color="purple">
        <template v-slot:left>
          <div class="row items-center">
            <q-icon left name="done" /> Left
          </div>
        </template>
        <template v-slot:right>
          <div class="row items-center">
            Right content.. long <q-icon right name="alarm" />
          </div>
        </template>

        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="bluetooth" />
          </q-item-section>
          <q-item-section>Marca bluetooth criada</q-item-section>
          <q-item-section side>
            <q-item-label caption>à 10 min</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset="item" />

        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="bluetooth" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Produto "Macbook" atualizado</q-item-label>
            <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>à 30 min</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset="item" />

        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" square icon="bluetooth" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cidade "São Paulo" criada</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>meta</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset="item" />

        <q-item>
          <q-item-section top avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>
          Marca
          <q-item-section>
            <q-item-label> "Didatikos" criada</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-badge label="10k" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset="item" />

        <q-item>
          <q-item-section top avatar>
            <q-avatar rounded>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Cidade "Uberlandia" criada</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>ontem às 12h</q-item-label>
          </q-item-section>
        </q-item>

      </q-slide-item>
    </q-menu>
  </q-btn>
</template>
