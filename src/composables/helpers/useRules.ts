export default function useRules () {
  const datetimeBrIsValid = (dateTimeBr: string) => {
    dateTimeBr = dateTimeBr.replace('/', '-').replace('/', '-')

    // Se quantidade de caracter é diferente de "dd/mm/YY H:i" ou "dd/mm/YYYY H:i" ou "dd/mm/YYYY H:i:ss", então é invalido
    if (dateTimeBr.length !== 16 && dateTimeBr.length !== 18 && dateTimeBr.length !== 21) {
      return false
    }
    const arrDateAndTime = dateTimeBr.split(' ')
    const arrDate = arrDateAndTime[0].split('-')
    const arrTime = arrDateAndTime[1].split(':')

    // Se posição meio do mes é maior que 12, então é invalido
    if (Number(arrDate[1]) > 12) {
      return false
    }

    // se ambas posições dia/ano são maiores de 31 e ambas possuem 2 caracters então é invalido
    if (arrDate[0].length === 2 && arrDate[2].length === 2 && Number(arrDate[0]) > 31 && Number(arrDate[2]) > 31) {
      return false
    }

    // se ano é menor ou maior que 2500 ou menor que 1500 então é invalida
    if (arrDate[0].length === 4 && (Number(arrDate[0]) <= 1500 || Number(arrDate[0]) >= 2500)) {
      return false
    }

    if (arrDate[0].length === 4 && Number(arrDate[2]) > 31) {
      return false
    }

    if (arrDate[2].length === 4 && Number(arrDate[0]) > 31) {
      return false
    }

    // Se hora é maior que 24 ou menor que 0
    if (Number(arrTime[0]) > 24 || Number(arrTime[0]) < 0) {
      return false
    }

    // Se minutos é maior que 60 ou menor que 0
    if (Number(arrTime[1]) > 60 || Number(Number(arrTime[1])) < 0) {
      return false
    }

    return true
  }

  return {
    datetimeBrIsValid
  }
}

export const $useRules = {
  datetimeBrIsValid: useRules().datetimeBrIsValid
}
