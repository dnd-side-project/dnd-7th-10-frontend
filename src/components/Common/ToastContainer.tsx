import React from 'react'
import styled from '@emotion/native'
import { useRecoilValue } from 'recoil'
import { toastsAtom } from '../../recoil/global'
import Toast from './Toast'

const ToastContainerView = styled.View`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 0;
`

const ToastContainer = () => {
  const toasts = useRecoilValue(toastsAtom)

  return (
    <ToastContainerView>
      {(toasts || []).map(toast => (
        <Toast
          key={toast.id || toast.message}
          warn={toast.warn}
          check={toast.check}
          variant={toast.variant}
          offset={toast.offset || 24}
        >
          {toast.message}
        </Toast>
      ))}
    </ToastContainerView>
  )
}

export default ToastContainer
