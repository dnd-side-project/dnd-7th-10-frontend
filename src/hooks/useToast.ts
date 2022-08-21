import { useSetRecoilState } from 'recoil'
import { IToast, toastsAtom } from '../recoil/global'

interface IToastHandler {
  [toastId: number]: number
}

interface IToastState {
  handlerId: number
  toastMap: IToastHandler
  handler: number
  toastId: number
}

let toastState: IToastState = {
  handlerId: 1,
  toastMap: {},
  handler: 0,
  toastId: 0
}

export const ToastOffset = {
  Default: 24,
  TagInput: 92,
  BottomTab: 144
}

export function createWarnToast(message: string, offset: number = 0): IToast {
  return {
    warn: true,
    message,
    variant: 'red',
    offset: offset
  }
}

export function createCheckToast(message: string, offset: number = 0): IToast {
  return {
    check: true,
    message,
    variant: 'blue',
    offset: offset
  }
}

export default function useToast() {
  const setToast = useSetRecoilState<IToast[]>(toastsAtom)

  function checkToast() {
    toastState.handler = 0
    setToast(toasts => {
      const index = toasts.findIndex(({ id }) => id === toastState.toastId)
      const newToasts = [...toasts]
      newToasts.splice(index, 1)
      return [...newToasts]
    })
  }

  function showToast(toast: IToast) {
    const toastId = toastState.handlerId++
    toastState.toastId = toast.id = toastId
    setToast(toasts => {
      return [...toasts, toast]
    })
    toastState.handler = setTimeout(checkToast, 2000)
  }

  return showToast
}
