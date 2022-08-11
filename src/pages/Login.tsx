import React from 'react'
import styled from '@emotion/native'
import KakaoLoginButton from '../components/KakaoLoginButton'

const LoginBox = styled.View`
  width: 100%;
  flex: 1;
  background: #ff5f28;
  align-items: center;
  justify-content: center;
`

const LoginImageLogo = styled.Image`
  width: 260px;
  height: 260px;
`

const LoginTextLogo = styled.Image`
  top: 25%;
  width: 238px;
  height: 60px;
  margin-top: -35px;
  position: absolute;
`

const LoginTextSlogan = styled.Image`
  top: 25%;
  width: 194px;
  height: 19px;
  margin-top: 35px;
  position: absolute;
`

const TeamLogo = styled.Image`
  bottom: 30px;
  position: absolute;
  width: 34px;
  height: 16px;
`

const KakaoLoginWrap = styled.View`
  position: absolute;
  bottom: 76px;
  align-self: stretch;
  flex-direction: row;
  margin-horizontal: 22px;
`

const Login = () => {
  return (
    <LoginBox>
      <LoginImageLogo
        source={require('../assets/images/login_image_logo.png')}
        resizeMode="contain"
      />
      <LoginTextLogo
        source={require('../assets/images/login_text_logo.png')}
        resizeMode="contain"
      />
      <LoginTextSlogan
        resizeMode="contain"
        source={require('../assets/images/login_text_slogan.png')}
      />
      <TeamLogo
        source={require('../assets/images/team_logo.png')}
        resizeMode="contain"
      />
      <KakaoLoginWrap>
        <KakaoLoginButton />
      </KakaoLoginWrap>
    </LoginBox>
  )
}

export default Login
