import { useSuspenseQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { MyProfileDetailType } from '@/types'

const getMyProfileDetail = async () => {
  const response = await authorizationInstance.get<MyProfileDetailType>(
    '/api/auth/find-by-id/detail'
  )

  return response.data.data
}

export const useGetMyProfileDetail = () => {
  return useSuspenseQuery({
    queryKey: ['myProfileDetail'],
    queryFn: () => getMyProfileDetail(),
  })
}
