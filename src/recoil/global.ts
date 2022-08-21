import { atom } from 'recoil'

export interface IModalState {
  isModalOpen: boolean
  title: string
  description: string
  cancel?: string
  ok?: string
  onOkPress?: () => void
  onCancelPress?: () => void
}

export const modalStateAtom = atom<IModalState>({
  key: 'modal',
  default: {
    isModalOpen: false,
    title: '',
    description: ''
  }
})

export interface IHeaderMenuHandler {
  (name: string): void
}
