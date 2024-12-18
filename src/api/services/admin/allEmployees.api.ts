import { useQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { SimpleEmployeeType } from '@/types'

const getAllEmployees = async () => {
  const response =
    await authorizationInstance.get<SimpleEmployeeType>('/api/auth/find-by')

  return response.data.content
}

export const useGetAllEmployees = () => {
  return useQuery({
    queryKey: ['allEmployees'],
    queryFn: () => getAllEmployees(),
  })
}
