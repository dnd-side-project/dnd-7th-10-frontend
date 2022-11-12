import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from '@emotion/native'
import KakaoLoginButton from '../components/Login/KakaoLoginButton'
import { backgroundWithColor } from '../styles/backgrounds'
import { Animated } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from './Router'
import useAuth, { IAuthResponse } from '../hooks/useAuth'
import useToast, { createToast } from '../hooks/useToast'
import kakao from '../lib/kakao'
import { useRecoilValue } from 'recoil'
import { noticeAtom } from '../recoil/global'
import Clipboard from '@react-native-clipboard/clipboard'
import { IAuth } from '../recoil/auth'

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
  const notice = useRecoilValue(noticeAtom)
  const showToast = useToast()
  const { setLoggedin, loginFromKeychain, setCallback } = useAuth()

  useEffect(() => {
    loginFromKeychain()
  }, [])

  const handleLogin = useCallback(
    (userAuth: IAuth) => {
      if (userAuth.user) {
        showToast(createToast('logged in with ' + userAuth.user.username))

        navigation.dispatch(StackActions.replace('Main'))
      }
    },
    [notice, navigation, showToast]
  )

  useEffect(() => {
    setCallback(() => handleLogin)
  }, [])

  // useEffect(() => {
  //   if (auth.user) {
  //     showToast(createToast('logged in with ' + auth.user.username))
  //     if (notice) {
  //       navigation.navigate('RemindingNotice', notice)
  //     } else {
  //       if (!checkNotice()) {
  //         navigation.dispatch(StackActions.replace('Main'))
  //       }
  //     }
  //   }
  // }, [auth, login, navigation, showToast, notice])

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
    kakao
      .kakaoLogin()
      .then(([success, response]) => {
        if (success) {
          const { accessToken, refreshToken } = response as IAuthResponse
          setLoggedin(accessToken, refreshToken)
          if (notice) {
            navigation.navigate('RemindingNotice', notice)
          } else {
            navigation.dispatch(StackActions.replace('Main'))
          }
        } else {
          Clipboard.setString(response.toString())
          showToast(createToast('로그인에 실패하였습니다.'))
        }
      })
      .catch(e => {
        console.error(e)
        showToast(createToast('로그인에 오류가 발생했습니다.'))
        Clipboard.setString(JSON.stringify(e))
      })
    // login('linkkle', 'linkkle2022!')
    //   .then(result => {
    //     if (result) {
    //       if (notice) {
    //         navigation.navigate('RemindingNotice', notice)
    //       } else {
    //         navigation.dispatch(StackActions.replace('Main'))
    //       }
    //     } else {
    //       showToast(createToast('로그인에 오류가 발생했습니다.'))
    //     }
    //   })
    //   .catch(e => {
    //     console.log(e)
    //     showToast(createToast('로그인에 오류가 발생했습니다.'))
    //     Clipboard.setString(JSON.stringify(e))
    //   })
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
