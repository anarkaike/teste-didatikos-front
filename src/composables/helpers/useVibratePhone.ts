import { useVibrate } from '@vueuse/core'

export default function useVibratePhone () {
  const { vibrate } = useVibrate()
  const patternForAction = [10, 20]
  const patternForAlert = [500]
  const patternForWarning = [700, 5, 5, 5, 700]
  const patternForError = [500, 5, 50, 5, 500]
  const patternForSuccess = [100, 5, 100, 50, 500]

  const vibrateForAction = () => {
    vibrate(patternForAction)
  }
  const vibrateForAlert = () => {
    vibrate(patternForAlert)
  }
  const vibrateForWarning = () => {
    vibrate(patternForWarning)
  }
  const vibrateForError = () => {
    vibrate(patternForError)
  }
  const vibrateForSuccess = () => {
    vibrate(patternForSuccess)
  }

  return {
    vibrateForAction,
    vibrateForAlert,
    vibrateForWarning,
    vibrateForError,
    vibrateForSuccess,
    vibrate
  }
}

export const $vibrate = {
  action: useVibratePhone().vibrateForAction,
  alert: useVibratePhone().vibrateForAlert,
  warning: useVibratePhone().vibrateForWarning,
  error: useVibratePhone().vibrateForError,
  success: useVibratePhone().vibrateForSuccess
}
