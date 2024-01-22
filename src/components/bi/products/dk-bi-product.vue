<template>
  <div>
    <div class="title-bi flex justify-around  q-mt-lg">
      <span>Por <strong>{{singlarLabel}}</strong>:</span>
      <q-chip dense>{{totalsByBrands.filter((r) => r > 0).length}} {{pluralLabel.toLowerCase()}}</q-chip>
    </div>
    <div class="col-12 col-md-4 q-px-xs">
      <q-input
        rounded filled
        v-model="search"
        :label="`Buscar ${singlarLabel}`"
        hide-bottom-space
        autocomplete="off"
        dense
        class="q-mt-xs"
      >
        <template #prepend>
          <icon icon="majesticons:search" />
        </template>
      </q-input>
    </div>
    <div class="scroll box-bi q-mb-sm">
      <div v-for="(row, index) in filtered" :key="row.id">
        <div class="q-mb-md" v-show="totalsByBrands[row.id] > 0">
          <strong>{{index+1}} • {{row.label}}</strong>
          <div style="color: #585f63;">
            <strong>{{totalsByBrands[row.id]}} produtos</strong> desta {{singlarLabel.toLowerCase()}}
            <q-separator />
            {{$formatting.decimal(sumStockByBrands[row.id])}} unidades em estoque ao total
            <q-separator />
            <strong>Somatória</strong> dos valores é de <strong>{{ $formatting.money(sumPriceByBrands[row.id]) }}</strong>
            <q-separator />
            Média de valor: {{$formatting.money(averagesPriceByBrands[row.id])}}
            <q-separator />
            Média de estoque: {{$formatting.money(averagesStockByBrands[row.id])}}
            <q-separator />
            <strong>Maior</strong> preço: <strong>{{maxPriceInBrands[row.id]?.name}}</strong> com <strong>{{$formatting.money(maxPriceInBrands[row.id]?.price??0)}}</strong>
            <q-separator />
            <strong>Menor</strong> preço: <strong>{{minPriceInBrands[row.id]?.name}}</strong> com <strong>{{$formatting.money(minPriceInBrands[row.id]?.price??0)}}</strong>
            <q-separator />
            <strong>Maior</strong> estoque: <strong>{{maxStockInBrands[row.id]?.name}}</strong> com <strong>{{$formatting.decimal(maxStockInBrands[row.id]?.price??0)}}</strong>
            <q-separator />
            <strong>Menor</strong> estoque: <strong>{{minStockInBrands[row.id]?.name}}</strong> com <strong>{{$formatting.decimal(minStockInBrands[row.id]?.price??0)}}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $bi, $formatting, $sanitization } from '@/composables'
import { EBiProductCalculateColumns, EBiProductTypes } from '@/enums'
import { IBrand, IOption, IProduct } from '@/interfaces'
import { $stores } from '@/stores/all'
import { computed, ComputedRef, ref, Ref } from 'vue'

const props = withDefaults(defineProps<{
  products?: IProduct[],
  type: EBiProductTypes,
  categories: IOption[]
}>(), {
  products: () => [],
  categories: () => []
})
const singlarLabel = props.type === EBiProductTypes.BRAND ? 'Marca' : 'Cidade'
const pluralLabel = props.type === EBiProductTypes.BRAND ? 'Marcas' : 'Cidades'
const funcName = props.type === EBiProductTypes.BRAND ? 'byBrand' : 'byCity'

const sumPriceByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.sums[funcName](props.products, EBiProductCalculateColumns.PRICE))
const sumStockByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.sums[funcName](props.products, EBiProductCalculateColumns.STOCK))
const totalsByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.totals[funcName](props.products))
const averagesPriceByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.avarages[funcName](props.products, EBiProductCalculateColumns.PRICE))
const averagesStockByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.avarages[funcName](props.products, EBiProductCalculateColumns.STOCK))
const maxPriceInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.max[funcName](props.products, EBiProductCalculateColumns.PRICE))
const maxStockInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.max[funcName](props.products, EBiProductCalculateColumns.STOCK))
const minPriceInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.min[funcName](props.products, EBiProductCalculateColumns.PRICE))
const minStockInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.min[funcName](props.products, EBiProductCalculateColumns.STOCK))
const search: Ref<string> = ref('')

const filtered = computed(() =>
  props.categories.filter((b) => $sanitization.forSearch(b.label as string)?.includes($sanitization.forSearch(search.value)))
)
</script>

<style lang="scss" scoped>
.box-bi {
  max-height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05) inset;
  border-radius: 5px;
  padding: 5px;
}
.title-bi {
  color: #C10209;
  .q-chip {
    color: #FFFFFF;
    background-color: #c10209;
    font-size: 12px;
  }
}
</style>
