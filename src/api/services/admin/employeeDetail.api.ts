import { useQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { EmployeeDetailType } from '@/types'

const getEmployeeDetail = async (employeeId: string) => {
  const response = await authorizationInstance.get<EmployeeDetailType>(
    '/api/auth/find-by-id',
    {
      params: { employeeId },
    }
  )

  console.log(response.data)

  return response.data.data
}

export const useGetEmployeeDetail = (employeeId: string) => {
  return useQuery({
    queryKey: ['employeeDetail', employeeId],
    queryFn: () => getEmployeeDetail(employeeId),
  })
}
