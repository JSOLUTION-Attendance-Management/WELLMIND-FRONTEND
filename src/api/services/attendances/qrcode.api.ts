import { useSuspenseQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'

export type QRCodeRequest = {
  longitude: string
  latitude: string
}

const postQRCode = async ({ longitude, latitude }: QRCodeRequest) => {
  const response = await authorizationInstance.post(
    `/api/qr/create?longitude=${longitude}&latitude=${latitude}`
  )

  return response.data.data
}

export const usePostQRCode = (longitude: string, latitude: string) => {
  return useSuspenseQuery({
    queryKey: ['myQRCode', longitude, latitude],
    queryFn: () => postQRCode({ longitude, latitude }),
  })
}
