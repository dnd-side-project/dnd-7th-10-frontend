import React from 'react'
import styled from '@emotion/native'

const HomeTopView = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 32px 0;
  height: 88px;
`

const LogoImage = styled.Image`
  width: 128px;
  height: 32px;
`

const MypageIcon = styled.Image`
  width: 24px;
  height: 24px;
`

const HomeTop = () => {
  return (
    <HomeTopView>
      <LogoImage
        source={require('../../assets/images/logo_colored.png')}
        resizeMode="contain"
      />
      <MypageIcon source={require('../../assets/images/icon_mypage.png')} />
    </HomeTopView>
  )
}

export default HomeTop
