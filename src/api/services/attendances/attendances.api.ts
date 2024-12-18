import { useQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { RecentAttendancesResponse } from '@/types'

export type RecentAttendancesRequest = {
  recentCount: number
}

const getRecentAttendances = async ({
  recentCount,
}: RecentAttendancesRequest) => {
  const response = await authorizationInstance.get<RecentAttendancesResponse>(
    '/api/attend/recent-attendances',
    {
      params: { recentCount },
    }
  )

  return response.data.data
}

export const useGetRecentAttendances = (recentCount: number) => {
  return useQuery({
    queryKey: ['myRecentAttendances', recentCount],
    queryFn: () => getRecentAttendances({ recentCount }),
  })
}
