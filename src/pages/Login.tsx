import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/native'
import KakaoLoginButton from '../components/Login/KakaoLoginButton'
import { backgroundWithColor } from '../styles/backgrounds'
import { Animated } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from './Router'
import useAuth from '../hooks/useAuth'
import useToast, { createToast } from '../hooks/useToast'
import kakao from '../lib/kakao'

const LoginBox = styled.View`
  ${backgroundWithColor('main_1')}
  width: 100%;
  flex: 1;
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
  bottom: 128px;
  position: absolute;
  width: 34px;
  height: 16px;
`

const KakaoLoginWrap = styled(Animated.View)`
  position: absolute;
  bottom: 52px;
  align-self: stretch;
  flex-direction: row;
  margin-left: 22px;
  margin-right: 22px;
`

const Login = () => {
  const [needLogin, setNeedLogin] = useState<boolean>(false)
  const kakaoOpacity = useRef(new Animated.Value(0)).current
  const navigation = useNavigation<RouterNavigationProps>()
  const showToast = useToast()

  const { auth, login, setLoggedin } = useAuth()

  useEffect(() => {
    // if (!auth.user) {
    //   login('user', '1234')
    // }
    if (auth.user) {
      showToast(createToast('logged in with ' + auth.user.username))
      navigation.dispatch(StackActions.replace('Main'))
    }
  }, [auth, login, navigation, showToast])

  useEffect(() => {
    setTimeout(() => {
      setNeedLogin(true)
      Animated.timing(kakaoOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start()
    }, 1500)
  }, [kakaoOpacity])

  const onKakaoPress = () => {
    kakao.kakaoLogin().then(response => {
      if (response) {
        const { accessToken, refreshToken } = response
        setLoggedin(accessToken, refreshToken)
        navigation.dispatch(StackActions.replace('Main'))
      }
    })
  }

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

      {needLogin && (
        <KakaoLoginWrap style={{ opacity: kakaoOpacity }}>
          <KakaoLoginButton onPress={onKakaoPress} />
        </KakaoLoginWrap>
      )}
    </LoginBox>
  )
}

export default Login
