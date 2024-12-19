import { useState } from 'react'
import { BiShow } from 'react-icons/bi'

import { useGetAllReports } from '@/api/services/admin/allReports.api'
import { EmployeeReport } from '@/components/EmployeeReport'
import {
  ConfirmModal,
  ConfirmModalButton,
} from '@/components/Modal/ConfirmModal'
import { ReportDetail } from '@/components/ReportDetail'
import LoadingPage from '@/pages/LoadingPage'

export default function EmployeeReportPage() {
  const { data: Reports, isLoading, error } = useGetAllReports()
  const [confirmIsOpen, setConfirmIsOpen] = useState(false)
  const [selectReport, setSelectReport] = useState<string | null>(null)
  const [reportOpen, setReportOpen] = useState(false)
  const employeeId = localStorage.getItem('employeeId')

  if (!employeeId) throw Error()

  const handleConfirmClick = () => {
    setConfirmIsOpen(false)
    setReportOpen(true)
  }

  if (isLoading) return <LoadingPage />
  if (error) throw error
  if (!Reports) return <div>레포트가 없습니다!</div>

  return (
    <div className="w-full h-full pt-5 flex flex-col gap-7">
      <div className="text-2xl text-text-default font-bold">
        직원 리포트 목록
      </div>
      <div>
        {Reports &&
          Reports.length > 0 &&
          Reports.map((report) => (
            <EmployeeReport
              key={report.reportId}
              id={report.reportId.toString()}
              date={report.registeredDate}
              name={report.reportedEmployeeName}
              type={report.reportType}
              progress={'Waiting'}
              comment={false}
              onClick={() => {
                setConfirmIsOpen(true)
                setSelectReport(report.reportId.toString())
              }}
            />
          ))}
      </div>
      <ConfirmModal
        isOpen={confirmIsOpen}
        onClose={() => setConfirmIsOpen(false)}
        icon={<BiShow />}
        title={`직원 리포트를 조회하시겠습니까?`}
        description={'직원 리포트 조회를 위해서는 권한 인증이 필요합니다.'}
        confirmButton={
          <ConfirmModalButton onClick={handleConfirmClick}>
            확인
          </ConfirmModalButton>
        }
      />
      {selectReport !== null && reportOpen === true && (
        <ReportDetail
          isOpen={selectReport !== null}
          onClose={() => {
            setSelectReport(null)
            setReportOpen(false)
          }}
          reportId={selectReport}
          employeeId={employeeId}
        />
      )}
    </div>
  )
}
