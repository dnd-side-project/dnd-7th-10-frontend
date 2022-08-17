import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { RecoilState, useRecoilState } from 'recoil'
import api from '../lib/api'

export interface ApiConfig<T> extends AxiosRequestConfig {
  preprocessor?(data: T): T
  queryOnMount?: boolean
  queryOnInitial: boolean
}

export interface Fetcher {
  (): Promise<AxiosResponse>
}

export interface RejectHandler {
  (e?: AxiosError): void
}

const defaultOptions = {
  queryOnMount: false,
  queryOnInitial: false
}

export interface Fetcher {
  (): Promise<any>
}

type UrlOrFetcher = string | Fetcher

export default function useRecoilApi<T>(
  urlOrFetcher: UrlOrFetcher = '/',
  recoilState: RecoilState<T>,
  config: ApiConfig<T> = defaultOptions
) {
  config = Object.assign(defaultOptions, config)
  const [recoilValue, setRecoilValue] = useRecoilState(recoilState)
  const cancelTokenSource = axios.CancelToken.source()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [response, setResponse] = useState<AxiosResponse<T>>()
  const [error, setError] = useState<AxiosError | null>(null)
  const [isFirstQuery, setIsFirstQuery] = useState<boolean>(true)
  const apiStates = { isLoading, isError, response, error }
  const fetcher: Fetcher = useMemo(
    () =>
      typeof urlOrFetcher === 'function'
        ? urlOrFetcher
        : () =>
            api.get<T>(urlOrFetcher, {
              ...config,
              cancelToken: cancelTokenSource.token
            }),
    [cancelTokenSource.token, config, urlOrFetcher]
  )

  const preResolveHandler = useCallback(
    (_response: AxiosResponse<T>) => {
      setResponse(_response)
      setRecoilValue(_response.data)
    },
    [setRecoilValue, setResponse]
  )

  const preRejectHandler = useCallback(
    (e: AxiosError) => {
      setIsError(true)
      setError(e)
    },
    [setIsError, setError]
  )

  const refresh = useCallback(() => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    setIsError(false)
    fetcher()
      .then(preResolveHandler)
      .catch(preRejectHandler)
      .finally(() => setIsLoading(false))
  }, [isLoading, fetcher, preResolveHandler, preRejectHandler])

  function cancel() {
    cancelTokenSource.cancel()
  }

  useEffect(() => {
    if (config.queryOnMount) {
      refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isFirstQuery && config.queryOnInitial) {
      refresh()
      setIsFirstQuery(false)
    }
  }, [isFirstQuery, refresh, config.queryOnInitial])

  return {
    ...apiStates,
    recoilValue,
    setRecoilValue,
    setIsLoading,
    setIsError,
    setResponse,
    refresh,
    cancel
  }
}
