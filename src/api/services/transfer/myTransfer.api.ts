import { useQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { PagingRequestParams, TransferResponseType } from '@/types'

const getMyTransfer = async (params: PagingRequestParams) => {
  const response = await authorizationInstance.get<TransferResponseType>(
    `/api/transfer/find-by-employeeId`,
    {
      params,
    }
  )

  return {
    content: response.data.content,
    totalPages: response.data.totalPages,
    totalElements: response.data.totalElements,
  }
}

export const useGetMyTransfer = (
  options: Partial<PagingRequestParams> = {}
) => {
  const { page = 0, size = 9, sort = [] } = options

  return useQuery({
    queryKey: ['myTransfer', page, size, sort],
    queryFn: () => getMyTransfer({ page, size, sort }),
  })
}
