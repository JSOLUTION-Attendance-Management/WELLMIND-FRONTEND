import RecentGraph from '@/components/RecentGraph'
import { ProfileReportItem } from '@/types'

export default function RecentReport({
  reports,
}: {
  reports: ProfileReportItem[]
}) {
  const reportAry = transformReportTypeToDummyData(reports)

  return (
    <div className="w-full">
      <RecentGraph data={reportAry} />
    </div>
  )
}

function transformReportTypeToDummyData(
  reportType: ProfileReportItem[]
): { text: string }[] {
  return reportType.map((report) => ({ text: report.reportType }))
}
