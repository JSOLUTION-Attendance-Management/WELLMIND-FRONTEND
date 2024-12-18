import { authorizationInstance } from '@/api/instance'
import { NewEmployeeItem } from '@/types'

export const postNewEmployee = async ({
  authType,
  departName,
  email,
  employeeId,
  name,
  phoneNum,
  positionName,
}: NewEmployeeItem) => {
  const response = await authorizationInstance.post(
    '/api/auth/register/profile',
    {
      authType,
      departName,
      email,
      employeeId,
      name,
      phoneNum,
      positionName,
    }
  )

  return response.data.message
}
