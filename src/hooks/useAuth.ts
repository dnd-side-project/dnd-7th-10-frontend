import jwtDecode from 'jwt-decode'
import { resetGenericPassword } from 'react-native-keychain'
import { useRecoilState } from 'recoil'
import api from '../lib/api'
import keychain from '../lib/keychain'
import { authAtom } from '../recoil/auth'
import useToast, { createWarnToast } from './useToast'

export interface IAuthResponse {
  header: string
  accessToken: string
  refreshToken: string
}

export interface IJwtStructure {
  sub: string
  exp: number
  username: string
}

export interface LoginResult {
  success: boolean
  code?: number
}

export default function useAuth() {
  const [auth, setAuth] = useRecoilState(authAtom)
  const showToast = useToast()

  async function login(name: string, password: string) {
    return new Promise<LoginResult>((resolve, reject) => {
      api
        .post<IAuthResponse>('/login', { username: name, password })
        .then(response => {
          if (response.status === 200) {
            const { accessToken, refreshToken } = response.data
            setLoggedin(accessToken, refreshToken)
            resolve({
              success: true
            })
          }
        })
        .catch(error => {
          showToast(createWarnToast('로그인 할 수 없습니다.'))
          reject({
            success: false,
            code: error.response ? error.response.status : 0
          })
        })
    })
  }

  function setLoggedin(accessToken: string, refreshToken: string) {
    const { username } = jwtDecode<IJwtStructure>(accessToken)

    api.setToken!(accessToken, refreshToken)

    console.log('new token registered')
    console.log(accessToken)
    console.log(refreshToken)

    setAuth({
      user: {
        username
      },
      authKey: {
        accessToken,
        refreshToken
      }
    })

    keychain
      .setToken(accessToken, refreshToken)
      .then(result => {
        console.log('save', result)
      })
      .catch(() => {
        console.error('failed to save token')
      })
  }

  function loginFromKeychain() {
    console.log('try to login with keychain')
    keychain
      .getCredentials()
      .then(credentials => {
        if (credentials) {
          const { username: accessToken, password: refreshToken } = credentials
          console.log('set token ', accessToken, refreshToken)
          api.setToken!(accessToken, refreshToken)
          console.log('refresh token')
          api.refreshToken!(success => {
            console.log(success)
            if (success) {
              setLoggedin(...api.getToken!())
            } else {
              resetGenericPassword()
            }
          })
        } else {
          console.log('credentials not found')
        }
      })
      .catch(() => {
        console.log('login failed with keychain')
      })
  }

  return {
    auth,
    login,
    setLoggedin,
    loginFromKeychain
  }
}
