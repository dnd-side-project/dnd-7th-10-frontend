import axios, { AxiosInstance, CancelTokenSource, HeadersDefaults } from 'axios'

interface CustomAxiosInstance extends AxiosInstance {
  setToken?(token: string): void
  getToken?(): string
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

  function setToken(token: string) {
    _token = token
    _api.defaults.headers = {
      ..._api.defaults.headers,
      Authorization: token
    } as HeaderProperties
  }

  function getToken(): string {
    const trimmedToken = _token.trim()
    return trimmedToken
  }

  _api.setToken = setToken
  _api.getToken = getToken

  return _api
})()

export default api
