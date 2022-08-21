import jwtDecode from 'jwt-decode'
import { useRecoilState } from 'recoil'
import api from '../lib/api'
import { authAtom } from '../recoil/auth'
import useToast, { createWarnToast } from './useToast'

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
  const showToast = useToast()

  async function login(name: string, password: string) {
    return new Promise<LoginResult>((resolve, reject) => {
      api
        .post<IAuthResponse>('/login', { username: name, password })
        .then(response => {
          if (response.status === 200) {
            const { accessToken, refreshToken } = response.data
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

  return {
    auth,
    login
  }
}
