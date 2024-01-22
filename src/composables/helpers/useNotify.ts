import { Notify } from 'quasar'

export default function useNotify () {
  // const $q = useQuasar()
  const position = 'top'

  const notifySuccess = (message: string) => {
    Notify.create({
      icon: 'check_circle',
      position,
      type: 'positive',
      message: message || 'All right !',
      actions: [
        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
      ]
    })
  }

  const notifyError = (message: string) => {
    Notify.create({
      icon: 'report',
      position,
      color: 'negative',
      message: message || 'Erro',
      actions: [
        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
      ]
    })
  }

  const notifyInfo = (message: string) => {
    Notify.create({
      icon: 'info',
      position,
      color: 'info',
      message,
      actions: [
        { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
      ]
    })
  }

  return {
    notifySuccess,
    notifyError,
    notifyInfo
  }
}

export const $notify = {
  success: useNotify().notifySuccess,
  error: useNotify().notifyError,
  info: useNotify().notifyInfo
}
