import React, { PropsWithChildren } from 'react'
import styled from '@emotion/native'

const HeaderBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 12px;
  height: 72px;
  align-items: center;
  background: white;
`

const HeaderText = styled.Text`
  color: #394a66;
`
// `

interface Props extends PropsWithChildren<HTMLDivElement> {}

const Header = ({ children }: Props) => (
  <HeaderBar>
    <HeaderText>{children}</HeaderText>
  </HeaderBar>
)

export default Header
