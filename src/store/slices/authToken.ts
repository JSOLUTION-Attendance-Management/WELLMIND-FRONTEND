import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthTokenState {
  accessToken: string
  refreshToken: string
}

const initialState: AuthTokenState = {
  accessToken: localStorage.getItem('accessToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || '',
}

const authTokenSlice = createSlice({
  name: 'authToken',
  initialState,
  reducers: {
    setAuthToken: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
      document.cookie = `accessToken=${action.payload.accessToken}; path=/; max-age=3600; Secure; SameSite=Lax`
      document.cookie = `refreshToken=${action.payload.refreshToken}; path=/; max-age=86400; Secure; SameSite=Lax;`
    },
    deleteAuthToken: (state) => {
      state.accessToken = ''
      state.refreshToken = ''
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      document.cookie = `accessToken=; path=/; max-age=0; secure`
      document.cookie = `refreshToken=; path=/; max-age=0; secure`
    },
  },
})
export const { setAuthToken, deleteAuthToken } = authTokenSlice.actions
export default authTokenSlice.reducer
