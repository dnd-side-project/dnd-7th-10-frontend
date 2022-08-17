import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import api from '../lib/api'

export interface ApiConfig<T> extends AxiosRequestConfig {
  preprocessor?(data: T): T
  queryOnMount?: boolean
}

export interface Fetcher {
  (): Promise<AxiosResponse>
}

export interface RejectHandler {
  (e?: AxiosError): void
}

const defaultOptions = {
  queryOnMount: true
}

export interface Fetcher {
  (): Promise<any>
}

type UrlOrFetcher = string | Fetcher

export default function useApi<T>(
  urlOrFetcher: UrlOrFetcher = '/',
  config: ApiConfig<T> = defaultOptions
) {
  config = Object.assign(defaultOptions, config)
  const cancelTokenSource = axios.CancelToken.source()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [response, setResponse] = useState<AxiosResponse<T>>()
  const [error, setError] = useState<AxiosError | null>(null)
  const apiStates = { isLoading, isError, response, error }
  const fetcher: Fetcher =
    typeof urlOrFetcher === 'function'
      ? urlOrFetcher
      : () =>
          api.get<T>(urlOrFetcher, {
            ...config,
            cancelToken: cancelTokenSource.token
          })

  function preResolveHandler(_response: AxiosResponse<T>) {
    setResponse(_response)
  }

  function preRejectHandler(e: AxiosError) {
    setIsError(true)
    setError(e)
  }

  function refresh() {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    setIsError(false)
    fetcher()
      .then(preResolveHandler)
      .catch(preRejectHandler)
      .finally(() => setIsLoading(false))
  }

  function cancel() {
    cancelTokenSource.cancel()
  }

  useEffect(() => {
    if (config.queryOnMount) {
      refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    ...apiStates,
    setIsLoading,
    setIsError,
    setResponse,
    refresh,
    cancel
  }
}
