import { useRecoilState } from 'recoil'
import { IModalState, modalStateAtom } from '../recoil/global'

export default function useModal() {
  const [{ isModalOpen }, setModalState] =
    useRecoilState<IModalState>(modalStateAtom)

  function showModal(
    title: string,
    description: string,
    ok?: string,
    cancel?: string
  ): Promise<boolean> {
    if (isModalOpen) {
      return Promise.reject()
    }
    return new Promise(resolve => {
      const newModalState: IModalState = {
        isModalOpen: true,
        title,
        description,
        ok,
        cancel,
        onOkPress: () => resolve(true),
        onCancelPress: () => resolve(false)
      }
      setModalState(newModalState)
    })
  }

  return {
    showModal
  }
}
