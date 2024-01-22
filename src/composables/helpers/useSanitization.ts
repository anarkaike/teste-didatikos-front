export default function useSanitization () {
  const forSearch = (string: string): string => {
    return string.toString()?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').substring(0)
  }

  return {
    forSearch
  }
}

export const $sanitization = {
  forSearch: useSanitization().forSearch
}
