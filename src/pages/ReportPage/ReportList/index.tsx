import React from 'react'
import { useState } from 'react'

import { ReportBox } from '@/components/ReportBox'
import { ReportDetail } from '@/components/ReportDetail'
import { MyReportItem } from '@/types'

interface ReportListProps {
  Reports: MyReportItem[]
}

export default function ReportList({ Reports }: ReportListProps) {
  const icons = ['⏰', '🔥', '🚗', '💼', '🏃🏻‍♂️']
  const [activeReportId, setActiveReportId] = useState<number | null>(null)

  return (
    <div className="w-full py-5 flex flex-col gap-5">
      <div className="flex flex-col gap-10">
        <div className="text-2xl text-text-default font-bold">
          웰니스 리포트
        </div>
        <div
          className="grid grid-cols-3 gap-6 mx-14 overflow-y-auto"
          style={{ height: '530px' }}
        >
          {Reports &&
            Reports.map((report, index) => (
              <React.Fragment key={report.reportId}>
                <ReportBox
                  key={report.reportId}
                  icon={icons[index % icons.length]}
                  reportType={report.reportType}
                  employeeId={report.reportedEmployeeId}
                  employeeName={report.reportedEmployeeName}
                  date={report.registeredDate}
                  description={`${report.reportType}에 관한 레포트입니다.\nAI 웰니스 리포트 및 담당자의 코멘트를 확인해보세요!`}
                  onClick={() => setActiveReportId(report.reportId)}
                />
                {activeReportId !== null &&
                  activeReportId === report.reportId && (
                    <ReportDetail
                      isOpen={activeReportId === report.reportId}
                      onClose={() => setActiveReportId(null)}
                      reportId={report.reportId}
                    />
                  )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  )
}
