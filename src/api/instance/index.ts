import { QueryClient } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'

import {
  authErrorInterceptor,
  authLoginErrorInterceptor,
} from '@/api/instance/authErrorInterceptor'
import { store } from '@/store/store'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000 * 60,
      throwOnError: true,
    },
    mutations: {
      throwOnError: true,
    },
  },
})

const initInstance = (config: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  })

  return instance
}

export const fetchInstance = initInstance({})

fetchInstance.interceptors.response.use(
  (response) => response,
  authLoginErrorInterceptor
)

export const authorizationInstance = initInstance({})

authorizationInstance.interceptors.request.use(
  (request) => {
    const state = store.getState()
    const accessToken = state.authToken.accessToken
    const refreshToken = state.authToken.refreshToken

    if (!accessToken || !refreshToken) {
      throw new Error()
    }

    return request
  },
  (error) => error
)

authorizationInstance.interceptors.response.use(
  (response) => response,
  authErrorInterceptor
)
