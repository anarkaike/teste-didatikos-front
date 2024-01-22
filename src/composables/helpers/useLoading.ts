import {
  Loading,
  QSpinnerPuff
} from 'quasar'

export default function useLoading () {
  const hide = () => {
    Loading.hide()
  }
  const show = (message = 'Carregando...') => {
    Loading.show({
      spinner: QSpinnerPuff,
      spinnerColor: 'yellow',
      messageColor: 'yellow',
      spinnerSize: 140,
      // backgroundColor: 'purple',
      customClass: 'box-loading',
      message,
      boxClass: 'box-loading-inner'
      // messageColor: 'black'
    })
  }

  return {
    show,
    hide
  }
}

export const $loading = {
  show: useLoading().show,
  hide: useLoading().hide
}
