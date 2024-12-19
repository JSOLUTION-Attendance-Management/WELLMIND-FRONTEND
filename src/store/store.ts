import { configureStore } from '@reduxjs/toolkit'

import authTokenSlice from './slices/authToken'
import myEmployeeIdSlice from './slices/myEmployeeId'

export const store = configureStore({
  reducer: {
    authToken: authTokenSlice,
    employeeId: myEmployeeIdSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
