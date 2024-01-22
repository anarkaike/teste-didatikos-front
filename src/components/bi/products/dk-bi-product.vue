<template>
  <div>
    <div class="title-bi flex justify-around  q-mt-lg">
      <span>Por <strong>{{singlarLabel}}</strong>:</span>
      <q-chip dense>{{totalsByBrands.filter((r) => r > 0).length}} {{pluralLabel.toLowerCase()}}</q-chip>
    </div>
    <div class="col-12 col-md-4 q-px-xs">
      <q-input
        rounded filled
        v-model="searchBrand"
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
      <div v-for="(brand, index) in brandsFiltered" :key="brand.id">
        <div class="q-mb-md" v-show="totalsByBrands[brand.id] > 0">
          <strong>{{index+1}} • {{brand.name}}</strong>
          <div style="color: #585f63;">
            <strong>{{totalsByBrands[brand.id]}} produtos</strong> desta {{singlarLabel.toLowerCase()}}
            <q-separator />
            {{$formatting.decimal(sumStockByBrands[brand.id])}} unidades em estoque ao total
            <q-separator />
            <strong>Somatória</strong> dos valores é de <strong>{{ $formatting.money(sumPriceByBrands[brand.id]) }}</strong>
            <q-separator />
            Média de valor: {{$formatting.money(averagesPriceByBrands[brand.id])}}
            <q-separator />
            Média de estoque: {{$formatting.money(averagesStockByBrands[brand.id])}}
            <q-separator />
            <strong>Maior</strong> preço: <strong>{{maxPriceInBrands[brand.id]?.name}}</strong> com <strong>{{$formatting.money(maxPriceInBrands[brand.id]?.price??0)}}</strong>
            <q-separator />
            <strong>Menor</strong> preço: <strong>{{minPriceInBrands[brand.id]?.name}}</strong> com <strong>{{$formatting.money(minPriceInBrands[brand.id]?.price??0)}}</strong>
            <q-separator />
            <strong>Maior</strong> estoque: <strong>{{maxStockInBrands[brand.id]?.name}}</strong> com <strong>{{$formatting.decimal(maxStockInBrands[brand.id]?.price??0)}}</strong>
            <q-separator />
            <strong>Menor</strong> estoque: <strong>{{minStockInBrands[brand.id]?.name}}</strong> com <strong>{{$formatting.decimal(minStockInBrands[brand.id]?.price??0)}}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $bi, $formatting, $sanitization } from '@/composables'
import { EBiProductCalculateColumns, EBiProductTypes } from '@/enums'
import { IBrand, IProduct } from '@/interfaces'
import { $stores } from '@/stores/all'
import { computed, ComputedRef, ref, Ref } from 'vue'

const props = withDefaults(defineProps<{
  products?: IProduct[],
  type: EBiProductTypes
}>(), {
  products: () => []
})
const singlarLabel = props.type === EBiProductTypes.BRAND ? 'Marca' : 'Cidade'
const pluralLabel = props.type === EBiProductTypes.BRAND ? 'Marcas' : 'Cidades'
const sumPriceByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.sums.byBrand(props.products, EBiProductCalculateColumns.PRICE))
const sumStockByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.sums.byBrand(props.products, EBiProductCalculateColumns.STOCK))
const totalsByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.totals.byBrand(props.products))
const averagesPriceByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.avarages.byBrand(props.products, EBiProductCalculateColumns.PRICE))
const averagesStockByBrands: ComputedRef<{[key: number]: number}> = computed(() => $bi.products.avarages.byBrand(props.products, EBiProductCalculateColumns.STOCK))
const maxPriceInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.max.byBrand(props.products, EBiProductCalculateColumns.PRICE))
const maxStockInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.max.byBrand(props.products, EBiProductCalculateColumns.STOCK))
const minPriceInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.min.byBrand(props.products, EBiProductCalculateColumns.PRICE))
const minStockInBrands: ComputedRef<{[key: number]: IProduct}> = computed(() => $bi.products.min.byBrand(props.products, EBiProductCalculateColumns.STOCK))
const searchBrand: Ref<string> = ref('')
const brandsFiltered = computed(() =>
  $stores.brands.list.filter((b: IBrand) => $sanitization.forSearch(b.name as string)?.includes($sanitization.forSearch(searchBrand.value)))
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
