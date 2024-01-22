import {
  Loading,
  QSpinnerPuff
} from 'quasar'

export default function useLoading () {
  const hideLoading = () => {
    Loading.hide()
  }
  const showLoading = (message = 'Carregando...') => {
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
    showLoading,
    hideLoading
  }
}

export const $loading = {
  show: useLoading().showLoading,
  hide: useLoading().hideLoading
}
