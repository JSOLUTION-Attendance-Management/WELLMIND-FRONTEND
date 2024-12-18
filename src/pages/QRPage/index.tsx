import { useEffect, useState } from 'react'

import LoadingPage from '@/pages/LoadingPage'
import QR from '@/pages/QRPage/QR'

export default function QRPage() {
  const [longitude, setLongitude] = useState<string | null>(null)
  const [latitude, setLatitude] = useState<string | null>(null)

  useEffect(() => {
    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      setLatitude(latitude.toString())
      setLongitude(longitude.toString())
    }
    const errorCallback = () => {
      alert('위치를 허용해주세요')
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    }
  }, [])

  if (longitude === null || latitude === null) {
    return <LoadingPage />
  }

  return <QR longitude={longitude} latitude={latitude} />
}
