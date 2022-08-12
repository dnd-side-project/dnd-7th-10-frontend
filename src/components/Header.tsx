import React from 'react'
import styled from '@emotion/native'
import { Image } from 'react-native'

const HeaderBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
  padding: 0px 10px 10px 10px;
`
const HeaderTitle = styled.Text`
  text-align: left;
  flex: 1;
  margin-left: 20px;
`

const Header = ({ text }) => (
  <HeaderBar>
    <Image source={require('../assets/images/backarrow.png')} />
    <HeaderTitle>{text}</HeaderTitle>
  </HeaderBar>
)

export default Header
