import { useQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { PagingRequestParams, ReportsType } from '@/types'

const getAllReports = async (params: PagingRequestParams) => {
  const response = await authorizationInstance.get<ReportsType>(
    `/api/report/list`,
    {
      params,
    }
  )

  return response.data.data.content
}

export const useGetAllReports = (
  options: Partial<PagingRequestParams> = {}
) => {
  const { page = 0, size = 20, sort = [] } = options

  return useQuery({
    queryKey: ['allReports', page, size, sort],
    queryFn: () => getAllReports({ page, size, sort }),
  })
}
