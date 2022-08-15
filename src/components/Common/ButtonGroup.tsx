import React, { PropsWithChildren } from 'react'
import styled from '@emotion/native'

const ButtonGroupView = styled.View`
  flex-direction: row;
  margin: 0 -4px;
`

const ButtonGroup = ({ children }: PropsWithChildren) => {
  return <ButtonGroupView>{children}</ButtonGroupView>
}

export default ButtonGroup
