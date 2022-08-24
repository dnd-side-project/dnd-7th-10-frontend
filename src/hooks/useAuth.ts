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

interface IJwtStructure {
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

    api.setToken!(accessToken)

    setAuth({
      user: {
        username
      },
      authKey: {
        accessToken,
        refreshToken
      }
    })

    keychain.setToken(accessToken, refreshToken).then(result => {
      console.log('save', result)
    })
  }

  function loginFromKeychain() {
    console.log('try to login with keychain')
    keychain
      .getCredentials()
      .then(credentials => {
        if (credentials) {
          const { username: accessToken, password: refreshToken } = credentials
          api
            .get('/folders')
            .then(response => {
              if (response.status === 200) {
                setLoggedin(accessToken, refreshToken)
                console.log(
                  'loggined in with keychain ',
                  accessToken,
                  refreshToken
                )
              } else {
                // failed
                resetGenericPassword()
              }
            })
            .catch(() => {
              // failed
              resetGenericPassword()
            })
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
