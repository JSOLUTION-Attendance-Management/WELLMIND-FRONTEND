import { useQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { CommuteResponseParams, PagingRequestParams } from '@/types'

type AttendRequest = {
  employeeId?: string
} & PagingRequestParams

const getAttend = async (params: AttendRequest) => {
  const response = await authorizationInstance.get<CommuteResponseParams>(
    `/api/attend/find-by`,
    {
      params,
    }
  )

  return {
    content: response.data.data.content,
    totalPages: response.data.data.totalPages,
    totalElements: response.data.data.totalElements,
  }
}

export const useGetAttend = (options: Partial<AttendRequest> = {}) => {
  const { page = 0, size = 9, sort = [], employeeId } = options

  return useQuery({
    queryKey: ['attend', page, size, sort, employeeId],
    queryFn: () => getAttend({ page, size, sort, employeeId }),
  })
}
