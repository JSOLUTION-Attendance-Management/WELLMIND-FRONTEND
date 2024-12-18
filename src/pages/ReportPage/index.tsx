import { useGetMyReport } from '@/api/services/reports/profileReport.api'
import LoadingPage from '@/pages/LoadingPage'
import ReportList from '@/pages/ReportPage/ReportList'

export default function ReportPage() {
  const { data: Reports, isLoading, error } = useGetMyReport()

  if (isLoading) return <LoadingPage />
  if (error) throw Error()
  if (!Reports) return '레포트가 없습니다.'

  return <ReportList Reports={Reports} />
}
