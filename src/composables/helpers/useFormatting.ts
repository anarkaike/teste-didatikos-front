import { HumanizeDurationLanguage, HumanizeDuration } from 'humanize-duration-ts'
import { date } from 'quasar'

export default function useFormatting () {
  const langService: HumanizeDurationLanguage = new HumanizeDurationLanguage()
  const humanizer: HumanizeDuration = new HumanizeDuration(langService)

  const duration = (milliseconds: number) => {
    const durationHumanized = humanizer.humanize(milliseconds, {
      language: 'pt',
      units: ['y', 'mo', 'w', 'd', 'h', 'm'],
      round: true
    })

    return durationHumanized.replace(/,\s*([^,]*)$/, ' e $1')
  }

  const datetime = (datetime: string, format = 'DD/MM HHhmm') => {
    let dateHumanized = ''
    datetime = datetime.replace('/', '-').replace('/', '-')

    if (datetime.length === 16 || datetime.length === 18 || datetime.length === 21) { // Formato BR que vem do cast do laravel
      const arrDateAndTime = datetime.split(' ')
      const arrDate = arrDateAndTime[0].split('-')
      if (arrDate[2].length === 2) { // Ano em 2 caracter
        datetime = arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0] + ' ' + arrDateAndTime[1]
      } else { // ano em 4 caracter
        datetime = arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0] + ' ' + arrDateAndTime[1]
      }
    }

    const yearOfDatetime = date.formatDate(datetime, 'YY')
    const yearOfNow = date.formatDate(new Date(), 'YY')

    if (format === 'DD/MM HHhmm') {
      format = yearOfDatetime === yearOfNow ? 'DD/MM HH' : 'DD/MM/YY HH'
      dateHumanized = date.formatDate(datetime, format) + 'h' + date.formatDate(datetime, 'mm')

      const sufix = yearOfDatetime === yearOfNow ? '' : '/'
      dateHumanized = dateHumanized
        .replace('/01' + sufix, '/jan' + sufix)
        .replace('/02' + sufix, '/fev' + sufix)
        .replace('/03' + sufix, '/mar' + sufix)
        .replace('/04' + sufix, '/mai' + sufix)
        .replace('/05' + sufix, '/abr' + sufix)
        .replace('/06' + sufix, '/jun' + sufix)
        .replace('/07' + sufix, '/jul' + sufix)
        .replace('/08' + sufix, '/ago' + sufix)
        .replace('/09' + sufix, '/set' + sufix)
        .replace('/10' + sufix, '/out' + sufix)
        .replace('/11' + sufix, '/nov' + sufix)
        .replace('/12' + sufix, '/dez' + sufix)

        .replace(' ', ' às ')
    } else {
      dateHumanized = date.formatDate(datetime, format)
    }

    return dateHumanized.replace('h00', 'h').replace(':00', 'h')
  }

  const money = (money: number, removeRightZero = true) => {
    if (isNaN(money)) return 0
    const moneyFormated = money.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return removeRightZero ? moneyFormated.replace(',00', '') : moneyFormated
  }

  const decimal = (number: number, minimumFractionDigits = 0) => {
    if (isNaN(number)) return 0
    return number.toLocaleString('pt-BR', { minimumFractionDigits, maximumFractionDigits: 2 })
  }

  return {
    duration,
    datetime,
    money,
    decimal
  }
}

export const $formatting = {
  duration: useFormatting().duration,
  datetime: useFormatting().datetime,
  money: useFormatting().money,
  decimal: useFormatting().decimal
}
