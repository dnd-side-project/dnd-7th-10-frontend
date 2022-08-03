import React from 'react'
import Logo from '../assets/image/logo.svg'
import Account from '../assets/image/account.svg'
import styled from '@emotion/native'

const TopView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
  background: white;
`

const Top = () => {
  return (
    <TopView>
      <Logo />
      <Account />
    </TopView>
  )
}

export default Top
