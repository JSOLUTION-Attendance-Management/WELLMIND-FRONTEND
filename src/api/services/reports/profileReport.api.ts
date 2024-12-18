import { useQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { MyReportItem, ProfileReportResponseType } from '@/types'

const getProfileReport = async (recentCount: number) => {
  const response = await authorizationInstance.get<ProfileReportResponseType>(
    `/api/report/recent`,
    {
      params: { recentCount },
    }
  )

  return response.data.data
}

export const useGetProfileReport = (recentCount: number) => {
  return useQuery({
    queryKey: ['profileReport', recentCount],
    queryFn: () => getProfileReport(recentCount),
  })
}

type MyReportResponseType = {
  data: MyReportItem[]
}

const getMyReport = async () => {
  const response =
    await authorizationInstance.get<MyReportResponseType>(`/api/report/cal`)

  return response.data.data
}

export const useGetMyReport = () => {
  return useQuery({
    queryKey: ['myReport'],
    queryFn: () => getMyReport(),
  })
}
