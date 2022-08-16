import jwtDecode from 'jwt-decode'
import { useRecoilState } from 'recoil'
import api from '../lib/api'
import keychain from '../lib/keychain'
import { authAtom } from '../recoil/auth'

interface IAuthResponse {
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

  async function login(name: string, password: string) {
    return new Promise<LoginResult>((resolve, reject) => {
      api
        .post<IAuthResponse>('/login', { username: name, password })
        .then(response => {
          if (response.status === 200) {
            const { accessToken, refreshToken } = response.data
            const { username } = jwtDecode<IJwtStructure>(accessToken)
            keychain
              .setToken(accessToken, refreshToken)
              .then(() => {
                setAuth({
                  user: {
                    username
                  },
                  authKey: {
                    accessToken,
                    refreshToken
                  }
                })
                resolve({
                  success: true
                })
                console.log('successfully saved')
              })
              .catch(() => {
                console.error('keychain login failed')
                reject({
                  success: false,
                  code: 0
                })
              })
          }
        })
        .catch(error => {
          console.error('failed')
          console.log(error.response.data)
          reject({
            success: false,
            code: error.response.status
          })
        })
    })
  }

  return {
    auth,
    login
  }
}
