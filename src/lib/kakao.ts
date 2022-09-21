import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  login
} from '@react-native-seoul/kakao-login'
import { IAuthResponse } from '../hooks/useAuth'
import api from './api'

async function kakaoLogin(): Promise<[boolean, IAuthResponse | string]> {
  const [loginSuccess, message] = await requestKakaoLogin()
  if (loginSuccess) {
    const profileSuccess = await requestProfile()
    console.log(profileSuccess)
    if (profileSuccess) {
      const { email } = profileSuccess as KakaoProfile

      try {
        const response = await api.post<IAuthResponse>('/kakao', {
          userEmail: email
        })
        return [true, response.data]
      } catch (e) {
        console.error(e)
      }
    } else {
      console.log('get profile failed')
    }
  } else {
    console.log('login failed')
  }
  return [false, message || '']
}

async function requestKakaoLogin(): Promise<[boolean, string?]> {
  try {
    const token: KakaoOAuthToken = await login()
    console.log(token.accessToken)
    return [true]
  } catch (e) {
    return [false, JSON.stringify(e)]
  }
}

async function requestProfile(): Promise<KakaoProfile | false> {
  try {
    const profile: KakaoProfile | KakaoProfileNoneAgreement = await getProfile()
    if (Object.hasOwnProperty.call(profile, 'email')) {
      return profile as KakaoProfile
    }
  } catch (e) {
    return false
  }
  return false
}

export default {
  kakaoLogin
}
