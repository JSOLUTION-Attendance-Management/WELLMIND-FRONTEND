import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface MyEmployeeIdState {
  employeeId: string
}

const initialState: MyEmployeeIdState = {
  employeeId: localStorage.getItem('employeeId') || '',
}

const myEmployeeIdSlice = createSlice({
  name: 'myEmployeeId',
  initialState,
  reducers: {
    setEmployeeId: (state, action: PayloadAction<{ employeeId: string }>) => {
      state.employeeId = action.payload.employeeId
      localStorage.setItem('employeeId', action.payload.employeeId)
    },
    deleteEmployeeId: (state) => {
      state.employeeId = ''
      localStorage.removeItem('employeeId')
    },
  },
})
export const { setEmployeeId, deleteEmployeeId } = myEmployeeIdSlice.actions
export default myEmployeeIdSlice.reducer
