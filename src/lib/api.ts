import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  HeadersDefaults
} from 'axios'
import { createWarnToast } from '../hooks/useToast'
import { IAuthKey } from '../recoil/auth'
import { IToast } from '../recoil/global'

type ShowToastFunc = (toast: IToast) => void

interface CustomAxiosInstance extends AxiosInstance {
  setToken?(token: string, refresh: string): void
  getToken?(): [string, string]
  refreshToken?(callback?: (value?: boolean) => void): void
  setShowToast?(func: ShowToastFunc): void
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
  let showToast = (toast: IToast) => {
    toast.check
  }
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
    timeout: 3000,
    cancelToken: cancelTokenSource.token
  })

  _api.defaults.timeout = 2000

  _api.interceptors.request.use(function (config: AxiosRequestConfig) {
    console.log('request : ' + config.url)
    return config
  })

  _api.interceptors.response.use(
    function (response: AxiosResponse) {
      return response
    },
    function (error: AxiosError) {
      if (error?.response?.status === 522) {
        showToast(createWarnToast('서버가 응답하지 않아요.'))
      }
      return error
    }
  )

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
      .post<IAuthKey>(
        '/refresh',
        {
          accessToken: _token.split(' ')[1],
          refreshToken: _refresh.split(' ')[1]
        },
        {
          headers: {
            Authorization: ''
          }
        }
      )
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
  _api.setShowToast = (func: ShowToastFunc) => {
    showToast = func
  }

  return _api
})()

export default api
