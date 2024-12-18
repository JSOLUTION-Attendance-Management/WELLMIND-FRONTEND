import { useEffect, useState } from 'react'
import { BiError } from 'react-icons/bi'

import { usePostQRCode } from '@/api/services/attendances/qrcode.api'
import { AlertModal } from '@/components/Modal/AlertModal'
import LoadingPage from '@/pages/LoadingPage'

interface QRtype {
  longitude: string
  latitude: string
}

export default function QR({ longitude, latitude }: QRtype) {
  const [time, setTime] = useState(300)
  const [alertModal, setAlertModal] = useState(false)
  const {
    data: qrCodeData,
    isLoading,
    isPending,
    error,
  } = usePostQRCode(longitude, latitude)

  useEffect(() => {
    if (!qrCodeData) return
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setAlertModal(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [qrCodeData])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

  if (isLoading || isPending) return <LoadingPage />
  if (error) {
    return (
      <div className="text-red-500 text-center">
        데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
      </div>
    )
  }
  if (!qrCodeData) {
    return (
      <div className="text-red-500 text-center">
        QR 코드 데이터를 찾을 수 없습니다.
      </div>
    )
  }

  if (alertModal) {
    return (
      <AlertModal
        isOpen={alertModal}
        onClose={() => {
          setAlertModal(false)
          window.location.reload()
        }}
        icon={<BiError />}
        title="QR 코드가 만료되었습니다"
        description="새로운 QR을 생성합니다."
      />
    )
  }

  return (
    <div className="flex flex-col justify-center items-center mt-8 gap-10">
      <div className="flex flex-col text-center gap-2">
        <div className="text-text-default text-4xl font-semibold">
          QR 코드 생성
        </div>
        <div className="text-default-red text-2xl">{formattedTime}</div>
      </div>
      <img
        src={`data:image/png;base64,${qrCodeData.qrToken}`}
        alt="QR Code"
        className="w-96 h-96"
      />
    </div>
  )
}
