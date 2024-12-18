type ReportBoxType = {
  icon: string
  reportType: string
  description: string
  employeeId: string
  employeeName: string
  date: string
  key: number
  onClick: () => void
}

export const ReportBox = ({
  icon,
  reportType,
  description,
  employeeId,
  employeeName,
  date,
  onClick,
}: ReportBoxType) => {
  return (
    <div
      className="pt-8 px-7 text-text-default bg-background-light h-72 rounded-xl w-full flex flex-col gap-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="text-2xl">{icon}</div>
      <div className="text-2xl font-semibold">{reportType}</div>
      <div className="w-full bg-text-gray" style={{ height: '0.5px' }} />
      <div
        className="text-text-darkgray text-xs"
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        {description}
      </div>
      <div className="text-sm flex flex-col gap-2 my-5">
        <div className="flex gap-2 items-center">
          <div className="font-semibold">{employeeName}</div>
          <div className="px-2 py-0.5 bg-red-100 text-red-500 rounded-md">
            {employeeId}
          </div>
        </div>
        <div className="text-xs mt-4">{`🗓️ 리포트 생성일 : ${date}`}</div>
      </div>
    </div>
  )
}
