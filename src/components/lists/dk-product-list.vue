<template>
  <div>
    <div class="text-h6 q-ml-sm q-mb-sm justify-between flex">
      <span class="col-grow">Listagem de Produtos</span>
      <span>
        <q-chip dense class="col-auto q-px-md chip-title">
          <strong>Preços • </strong>  Média:  <strong>{{$formatting.money(averagePrice)}}</strong> • Soma: <strong>{{$formatting.money(sumPrice)}}</strong>
        </q-chip>
        <q-chip dense class="col-auto q-px-md chip-title">
          <strong>Estoque • </strong>  Média:  <strong>{{$formatting.decimal(averageStock)}}</strong> • Soma: <strong>{{$formatting.decimal(sumStock)}}</strong>
        </q-chip>
      </span>
    </div>
    <div class="ctn-filter">
      <div class="row">
      <div class="col-12 col-md-4 q-px-xs">
        <q-input
          rounded
          standout
          v-model="filterData.search"
          label="Buscar produto"
          hide-bottom-space
          autocomplete="off"
          dense
        >
          <template #prepend>
            <icon icon="majesticons:search" />
          </template>
        </q-input>
        <div class="text-caption text-center">
          Por nome, marca, cidade ou id
        </div>
      </div>
      <div class="col-12 col-md-4 q-px-xs">
        <div class="row">
          <q-input
            rounded
            standout
            v-model="filterData.price_start"
            :label="$q.screen.sm || $q.screen.md ? 'De' : 'Preço de'"
            class="col-12 col-md-6"
            hide-bottom-space
            autocomplete="off"
            dense
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
            prefix="R$ "
          />
          <q-input
            rounded
            standout
            v-model="filterData.price_end"
            :label="$q.screen.sm || $q.screen.md ? 'Até' : 'Preço até'"
            class="col-12 col-md-6"
            hide-bottom-space
            autocomplete="off"
            dense
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
            prefix="R$ "
          />
        </div>
        <div class="text-caption text-center">Intervalo de preços</div>
      </div>
      <div class="col-12 col-md-4 q-px-xs">
        <div class="row">
          <q-input
            rounded
            standout
            v-model="filterData.stock_start"
            :label="$q.screen.sm || $q.screen.md ? 'De' : 'Estoque de'"
            class="col-12 col-md-6"
            hide-bottom-space
            autocomplete="off"
            dense
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
          />
          <q-input
            rounded
            standout
            v-model="filterData.stock_end"
            :label="$q.screen.sm || $q.screen.md ? 'Até' : 'Estoque até'"
            class="col-12 col-md-6"
            hide-bottom-space
            autocomplete="off"
            dense
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
          />
        </div>
        <div class="text-caption text-center">Intervalo de estoque</div>
      </div>
    </div>
    </div>
    <q-table
      class="my-sticky-last-column-table"
      flat
      :rows="productsFiltered"
      compact
      :columns="columns"
      :loading="$stores.products.loading"
      :visible-columns="visibleColumns"
      row-key="id"
      rows-per-page-label="Produtos por página"
      :pagination="{rowsPerPage: 4}"
      :pagination-label="(firstRowIndex: number, endRowIndex: number, totalRowsNumber: number) => `Produto ${firstRowIndex.toString()} ao ${endRowIndex.toString()} de ${totalRowsNumber.toString()}`"
    >

      <!-- TEMPLATE PARA SLOT DE BODY DA TABELA -->
      <template v-slot:body="props">
        <q-tr :props="props" :class="{'editing-product': (productForEdit.id === props.row.id)}">

          <!-- TEMPLATE COLUNA ID -->
          <q-td auto-width key="id" :props="props" @click="methods.onEdit(props.row)" class="cursor-pointer">
            {{props.row.id}}
          </q-td>

          <!-- TEMPLATE COLUNA NAME -->
          <q-td key="name" :props="props" @click="methods.onEdit(props.row)" class="cursor-pointer">
            <div class="text-bold">
              <span>{{props.row.name}} </span>
              <q-chip dense class="chip-green q-ml-md" v-if="productForEdit.id === props.row.id">
                Editando este produto
              </q-chip>
            </div>
            <div class="brand-city">
              Marca <strong>{{props.row.brand_name}}</strong>
              <br>
              Cidade <strong>{{props.row.city_name}}</strong>
            </div>
            <div class="sm-hide md-hide lg-hide xl-hide">
              Preço: {{$formatting.money(props.row.price)}}
              <DkIconUpDown :value1="props.row.price" :value2="averagePrice" />
              <br />
              Qtd: {{$formatting.decimal(props.row.stock)}}
              <DkIconUpDown :value1="props.row.stock" :value2="averageStock" />
            </div>
            <q-tooltip
              class="text-body2 tooltip-gray-mini"
              :offset="[-140, -7]"
              anchor="top end"
              transition-show="scale"
              transition-hide="scale"
            >
              Clique na linha para editar este produto
              <div v-if="props.row.created_at">
                <strong>{{props.row.created_by_name}}</strong>
                {{props.row.created_by_name?' o criou em ':'Criado em '}}
                <strong>{{ $formatting.datetime(props.row.created_at) }}</strong>
              </div>
              <div v-if="props.row.updated_at">
                <strong>{{props.row.updated_by_name}}</strong>
                {{props.row.updated_by_name?' atualizou em ':'Atualizado em '}}
                <strong>{{ $formatting.datetime(props.row.updated_at) }}</strong>
              </div>
            </q-tooltip>
          </q-td>

          <!-- TEMPLATE COLUNA PREÇO -->
          <q-td auto-width key="price" :props="props" class="xs-hide cursor-pointer" @click="methods.onEdit(props.row)">
            <q-chip outline>
              R$ {{$formatting.money(props.row.price)}}
              <DkIconUpDown :value1="props.row.price" :value2="averagePrice" />
            </q-chip>
          </q-td>

          <!-- TEMPLATE COLUNA ESTOQUE -->
          <q-td auto-width key="stock" :props="props" class="xs-hide cursor-pointer" @click="methods.onEdit(props.row)">
            <q-chip outline>
              {{$formatting.decimal(props.row.stock)}}
              <DkIconUpDown :value1="props.row.stock" :value2="averageStock" />
            </q-chip>
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
          <div v-if="$stores.products.loading">
            <QSpinnerPuff size="100" />
            <br />
            Carregando produtos
          </div>
          <div v-else>
            Nenhum Produto contrado
          </div>
        </div>
      </template>
    </q-table>

    <div class="flex justify-between">
      <q-chip dense class="col-auto q-px-md chip-title">
        <u>Menor</u> valor: <strong>{{minPrice.name}}</strong> com <strong>R$ {{$formatting.money(minPrice.price)}}</strong>
      </q-chip>
      <q-chip dense class="col-auto q-px-md chip-title">
        <u>Maior</u> valor: <strong>{{maxPrice.name}}</strong> com <strong>R$ {{$formatting.money(maxPrice.price)}}</strong>
      </q-chip>
    </div>
    <q-separator />
    <div class="flex justify-between">
      <q-chip dense class="col-auto q-px-md chip-title">
        <u>Menor</u> estoque: <strong>{{minStock.name}}</strong> com <strong>{{$formatting.decimal(minStock.stock)}}</strong>
      </q-chip>
      <q-chip dense class="col-auto q-px-md chip-title">
        <u>Maior</u> estoque: <strong>{{maxStock.name}}</strong> com <strong>{{$formatting.decimal(maxStock.stock)}}</strong>
      </q-chip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EBiProductCalculateColumns } from '@/enums'
import { computed, Ref, ref, watchEffect } from 'vue'
import { useQuasar, QSpinnerPuff } from 'quasar'
import { $stores } from '@/stores/all'
import { IProduct } from '@/interfaces'
import { $formatting, $sanitization, $bi } from '@/composables'
import { JcGroupBtnForTables } from '@/components'
import { DkIconUpDown } from './dk-product-list'

// No formato BR trato como string. Para calculos, o tipo precisa ser number
interface IFilterData {
  search: string,
  price_start: number | string | null,
  price_end: number | string | null,
  stock_start: number | string | null,
  stock_end: number | string | null
}

// PROPS ----------------------------------------
const props = withDefaults(defineProps<{
  products?: IProduct[],
  productForEdit?: IProduct
}>(), {})
const $q = useQuasar()
const filterData: Ref<IFilterData> = ref({ search: '', price_start: null, price_end: null, stock_start: null, stock_end: null })
const visibleColumns = computed(() => $q.screen.xs ? ['id', 'name', 'actions'] : ['id', 'name', 'stock', 'price', 'actions'])
const products: Ref<IProduct[]> = ref(props.products ?? [])
const columns = ref([
  { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'price', align: 'center', label: 'Preço', field: 'price', sortable: true },
  { name: 'stock', align: 'center', label: 'Qtd', field: 'stock', sortable: true },
  { name: 'actions', align: 'center', label: 'Ações', field: 'actions', sortable: false }
])

// Trocando para formato amricano para filtros por comparações
const convertMoney = (money: string | number): number => Number(String(money).replace(',', '.'))
// Colcoando minusculo e sem acentos para filtragem
const productsFiltered = computed(() => {
  // const key = filterData.value.search.toLowerCase().split(' ')
  const productsFiltered = $stores.products.list.filter((product: IProduct) => {
    let found = false
    const columnsForFilter = ['id', 'name', 'brand_name', 'city_name']
    columnsForFilter.forEach((column: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const value = $sanitization.forSearch(product[column])
      // key.forEach((partialKey) => {
      if (value?.includes($sanitization.forSearch(filterData.value.search))) found = true
      // })
    })
    if (filterData.value.price_start && String(filterData.value.price_start) !== '0,00') {
      found = found && convertMoney(filterData.value.price_start) <= (product.price ?? 0)
    }
    if (filterData.value.price_end && String(filterData.value.price_end) !== '0,00') {
      found = found && convertMoney(filterData.value.price_end) >= (product.price ?? 0)
    }
    if (filterData.value.stock_start && String(filterData.value.stock_start) !== '0,00') {
      found = found && convertMoney(filterData.value.stock_start) <= (product.stock ?? 0)
    }
    if (filterData.value.stock_end && String(filterData.value.stock_end) !== '0,00') {
      found = found && convertMoney(filterData.value.stock_end) >= (product.stock ?? 0)
    }
    return found
  })
  emit('on-products-filtered', productsFiltered)
  return productsFiltered
})

const emit = defineEmits([
  'on-edit',
  'on-products-filtered'
])

watchEffect(() => {
  emit('on-products-filtered', productsFiltered.value)
})

const averagePrice = computed(() => $bi.products.avarages.inAll(productsFiltered.value, EBiProductCalculateColumns.PRICE))
const sumPrice = computed(() => $bi.products.sums.inAll(productsFiltered.value, EBiProductCalculateColumns.PRICE))
const maxPrice = computed(() => $bi.products.max.inAll(productsFiltered.value, EBiProductCalculateColumns.PRICE))
const minPrice = computed(() => $bi.products.min.inAll(productsFiltered.value, EBiProductCalculateColumns.PRICE))
const averageStock = computed(() => $bi.products.avarages.inAll(productsFiltered.value, EBiProductCalculateColumns.STOCK))
const sumStock = computed(() => $bi.products.sums.inAll(productsFiltered.value, EBiProductCalculateColumns.STOCK))
const maxStock = computed(() => $bi.products.max.inAll(productsFiltered.value, EBiProductCalculateColumns.STOCK))
const minStock = computed(() => $bi.products.min.inAll(productsFiltered.value, EBiProductCalculateColumns.STOCK))

const methods = {
  calculateSum (field: 'price'|'stock'): number {
    if (productsFiltered.value.length === 0) return 0
    return productsFiltered.value.reduce((s: number, product: IProduct): number => s + (product[field] ?? 0), 0)
  },
  onEdit (product: IProduct): void {
    emit('on-edit', {
      ...product,
      ...{
        price: $formatting.decimal(product?.price ?? 0, 2),
        stock: $formatting.decimal(product?.stock ?? 0, 2)
      }
    })
  },
  onDelete (product: IProduct): void {
    $q.dialog({
      title: 'Atenção!',
      message: `Deseja realmente excluir o produto ${product.name}?`,
      cancel: true,
      persistent: true
    }).onOk(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      $stores.products.delete(product.id).then(() => {
        products.value.splice(products.value.findIndex((r: IProduct) => r.id === product.id), 1)
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
.editing-product {
  background-color: rgba(193, 2, 9, 0.007);
  background-image: url('/imgs/bg-editing.png');
  background-size: contain;
}
.my-sticky-last-column-table {
  .brand-city {
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
