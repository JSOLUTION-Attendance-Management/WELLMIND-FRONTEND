import { BiCheckCircle, BiChevronRight, BiXCircle } from 'react-icons/bi'

import { ReportColors } from '@/components/utils/ReportColors'
import { EmployeeReportItem } from '@/types'

export const EmployeeReport = ({
  id,
  date,
  name,
  type,
  progress,
  comment,
  onClick,
}: EmployeeReportItem) => {
  return (
    <div className="w-full my-2.5 py-1.5 px-2 flex border border-text-default rounded-md text-lg text-center">
      <div className="w-1/6">{date}</div>
      <div className="w-1/6 font-semibold">{name}</div>
      <div className="w-1/6">
        <div
          className={`text-text-white rounded-full inline-block px-4 ${ReportColors(type)}`}
        >
          {type}
        </div>
      </div>
      {progress === 'Waiting' ? (
        <div className="w-1/6 text-primary-400">{progress}</div>
      ) : (
        <div className="w-1/6 text-default-green">{progress}</div>
      )}
      <div className="w-1/6 flex items-center justify-center gap-2">
        {comment ? (
          <>
            코멘트
            <BiCheckCircle className="w-6 h-6" />
          </>
        ) : (
          <>
            코멘트
            <BiXCircle className="w-6 h-6" />
          </>
        )}
      </div>
      <div className="w-1/6">
        <button
          onClick={() => onClick(id)}
          className="flex inline-flex justify-center items-center text-default-purple"
        >
          리포트 바로가기
          <BiChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
