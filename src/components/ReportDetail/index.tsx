import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useGetMyReportDetail } from '@/api/services/reports/reportDetail.api'
import { DetailReportBox } from '@/components/ReportDetail/DetailReportBox'
import LoadingPage from '@/pages/LoadingPage'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  reportId: number
}

export const ReportDetail = ({
  isOpen,
  onClose,
  reportId,
}: ConfirmModalProps) => {
  const queryClient = useQueryClient()
  const {
    data: detailReport,
    isLoading,
    error,
  } = useGetMyReportDetail({ reportId })

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['myReportDetail', reportId],
    })
  }, [reportId, queryClient])

  if (isLoading)
    return (
      <div
        className="absolute z-100 items-center justify-center"
        style={{ width: '1000px' }}
      >
        <LoadingPage />
      </div>
    )
  if (error) throw Error()

  if (!detailReport) return '레포트가 없습니다.'

  return (
    <DetailReportBox isOpen={isOpen} onClose={onClose} report={detailReport} />
  )
}
