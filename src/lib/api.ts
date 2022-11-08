import axios, { AxiosInstance, CancelTokenSource, HeadersDefaults } from 'axios'
import { IAuthKey } from '../recoil/auth'

interface CustomAxiosInstance extends AxiosInstance {
  setToken?(token: string, refresh: string): void
  getToken?(): [string, string]
  refreshToken?(callback?: (value?: boolean) => void): void
}

interface HeaderProperties extends HeadersDefaults {
  Authorization: string
}

export interface TakeAllData<T> {
  data: T[]
  meta: {
    page: number
    pageCount: number
  }
}

const api = (() => {
  let _token = ''
  let _refresh = ''
  const cancelTokenSource: CancelTokenSource = axios.CancelToken.source()
  const _api: CustomAxiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0
    },
    baseURL: 'https://linkkle.me/api/',
    cancelToken: cancelTokenSource.token
  })

  function setToken(token: string, refresh: string) {
    _token = token
    _refresh = refresh
    _api.defaults.headers = {
      ..._api.defaults.headers,
      Authorization: token
    } as HeaderProperties
  }

  function getToken(): [string, string] {
    const trimmedToken = _token.trim()
    return [trimmedToken, _refresh]
  }

  function refreshToken(callback: (value?: boolean) => void) {
    api
      .post<IAuthKey>('/refresh', {
        accessToken: _token.split(' ')[1],
        refreshToken: _refresh.split(' ')[1]
      })
      .then(response => {
        if (response.status === 200) {
          _token = 'Bearer ' + response.data.accessToken
          _refresh = 'Bearer ' + response.data.refreshToken
          if (callback) {
            callback(true)
          }
        } else {
          if (callback) {
            callback(false)
          }
        }
      })
      .catch(() => {
        if (callback) {
          callback(false)
        }
      })
  }

  _api.setToken = setToken
  _api.getToken = getToken
  _api.refreshToken = refreshToken

  return _api
})()

export default api
