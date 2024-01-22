<template>
  <div>
    <div class="title-bi flex justify-around  q-mt-lg">
      <span>Por <strong>{{singlarLabel}}</strong>:</span>
      <q-chip dense>{{totals.filter((r) => r > 0).length}} produtos nestas {{pluralLabel.toLowerCase()}}</q-chip>
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
      <div v-for="(row) in filtered" :key="row.id">
        <div class="q-mb-md" v-show="totals[row.id] > 0">
          <div style="color: #585f63;">
            <div class="flex justify-between">
              <div class="title-info-bi">{{singlarLabel}} {{row.label}}</div>
              <q-chip dense outline class="chip-info-bi">{{totals[row.id]}} produtos</q-chip>
            </div>

            <div class="subtitle-info-bi flex justify-between">
              <span>Estoque:</span>
              <span>
                <q-chip dense outline class="chip-info-bi">Soma total: {{$formatting.decimal(sumStock[row.id])}}</q-chip>
                <q-chip dense outline class="chip-info-bi">Média: {{$formatting.decimal(averagesStock[row.id])}}</q-chip>
              </span>
            </div>
            <div class="label-bi">Menor quantidade em estoque:</div>
            <div class="valor-bi">{{minStockInBrands[row.id]?.name}} ({{$formatting.decimal(minStockInBrands[row.id]?.price??0)}})</div>
            <div class="label-bi">Maior quantidade em estoque:</div>
            <div class="valor-bi">{{maxStockInBrands[row.id]?.name}} ({{$formatting.decimal(maxStockInBrands[row.id]?.price??0)}})</div>

            <div class="subtitle-info-bi flex justify-between">
              <span>Preço:</span>
              <span>
                <q-chip dense outline class="chip-info-bi">Soma total: R$ {{ $formatting.money(sumPrice[row.id]) }}</q-chip>
                <q-chip dense outline class="chip-info-bi">Média: R$ {{$formatting.money(averagesPrice[row.id])}}</q-chip>
              </span>
            </div>
            <div class="flex justify-between">
              <div>
                <div class="label-bi">Maior valor:</div>
                <div class="valor-bi">{{minPriceInBrands[row.id]?.name}} (R$ {{$formatting.money(minPriceInBrands[row.id]?.price??0)}})</div>
              </div>
              <div>
                <div class="label-bi">Maior valor:</div>
                <div class="valor-bi">{{maxPriceInBrands[row.id]?.name}} (R$ {{$formatting.money(maxPriceInBrands[row.id]?.price??0)}})</div>
              </div>
            </div>
            <q-separator class="q-my-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $bi, $formatting, $sanitization } from '@/composables'
import { EBiProductCalculateColumns, EBiProductTypes } from '@/enums'
import { IOption, IProduct } from '@/interfaces'
import { computed, ComputedRef, ref, Ref } from 'vue'

const props = withDefaults(defineProps<{
  products?: IProduct[]|null,
  type: EBiProductTypes,
  categories: IOption[]|null
}>(), {
  products: () => [],
  categories: () => []
})
const singlarLabel = props.type === EBiProductTypes.BRAND ? 'Marca' : 'Cidade'
const pluralLabel = props.type === EBiProductTypes.BRAND ? 'Marcas' : 'Cidades'
const funcName = props.type === EBiProductTypes.BRAND ? 'byBrand' : 'byCity'

const sumPrice: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.sums[funcName](props.products as IProduct[], EBiProductCalculateColumns.PRICE))
const sumStock: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.sums[funcName](props.products as IProduct[], EBiProductCalculateColumns.STOCK))
const totals: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.totals[funcName](props.products as IProduct[]))
const averagesPrice: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.avarages[funcName](props.products as IProduct[], EBiProductCalculateColumns.PRICE))
const averagesStock: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.avarages[funcName](props.products as IProduct[], EBiProductCalculateColumns.STOCK))
const maxPriceInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.max[funcName](props.products as IProduct[], EBiProductCalculateColumns.PRICE))
const maxStockInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.max[funcName](props.products as IProduct[], EBiProductCalculateColumns.STOCK))
const minPriceInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.min[funcName](props.products as IProduct[], EBiProductCalculateColumns.PRICE))
const minStockInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.min[funcName](props.products as IProduct[], EBiProductCalculateColumns.STOCK))
const search: Ref<string> = ref('')

const filtered = computed(() =>
  (props.categories ?? []).filter((b) => $sanitization.forSearch(b.label as string)?.includes($sanitization.forSearch(search.value)))
)
</script>

<style lang="scss" scoped>
.box-bi {
  max-height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05) inset;
  border-radius: 5px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.6);
}
.title-bi {
  color: #C10209;
  .q-chip {
    color: #FFFFFF;
    background-color: #c10209;
    font-size: 12px;
  }
}

.title-info-bi {
  font-size: 16px;
  font-weight: 1000;
  color: #bf020a;
}
.subtitle-info-bi {
  font-size: 15px;
  font-weight: 700;
}
.label-bi {
  font-size: 13px;
  font-weight: 500;
}
.valor-bi {
  font-size: 12px;
  font-weight: 300;
}
.chip-info-bi {
  border: 1px solid #CCC;
  font-size: 12px;
  color: #666;
}
</style>
