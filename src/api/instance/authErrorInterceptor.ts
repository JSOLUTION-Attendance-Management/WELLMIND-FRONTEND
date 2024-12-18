import { AxiosError } from 'axios'

import { store } from '@/store/store'

export function authErrorInterceptor(error: AxiosError) {
  if (error.response) {
    const { status } = error.response
    if (status === 401) {
      store.dispatch({ type: 'authToken/deleteAuthToken' })
    }
  }
  return Promise.reject(error)
}

export function authLoginErrorInterceptor(error: AxiosError) {
  if (error.response) {
    const { status } = error.response
    if (status === 400 || status === 404 || status === 409) {
      return error.response
    }
  }
  return Promise.reject(error)
}
