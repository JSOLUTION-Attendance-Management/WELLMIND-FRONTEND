import { useEffect, useState } from 'react'

import { useGetRecentAttendances } from '@/api/services/attendances/attendances.api'
import { useGetMyProfileDetail } from '@/api/services/profile/myProfileDetail'
import { useGetProfileReport } from '@/api/services/reports/profileReport.api'
import LoadingPage from '@/pages/LoadingPage'
import CommuteGraph from '@/pages/MainPage/SlideMenu/CommuteGraph'
import DetailInfo from '@/pages/MainPage/SlideMenu/DetailInfo'
import RecentReport from '@/pages/MainPage/SlideMenu/RecentReport'
import { useAppDispatch } from '@/store/hooks/useAppDispatch'
import { setEmployeeId } from '@/store/slices/myEmployeeId'

export default function SlideMenu() {
  const [activeBtn, setActiveBtn] = useState<number>(0)
  const dispatch = useAppDispatch()
  const {
    data: Attendances,
    isLoading: attendancesLoading,
    error: attendancesError,
  } = useGetRecentAttendances(10)
  const {
    data: Report,
    isLoading: reportLoading,
    error: reportError,
  } = useGetProfileReport(6)
  const {
    data: ProfileDetail,
    isLoading: detailLoading,
    error: detailError,
  } = useGetMyProfileDetail()

  useEffect(() => {
    if (ProfileDetail?.employeeId) {
      dispatch(setEmployeeId({ employeeId: ProfileDetail.employeeId }))
    }
  }, [ProfileDetail])

  if (attendancesLoading || reportLoading || detailLoading)
    return <LoadingPage />
  if (attendancesError || reportError || detailError) throw Error
  if (!Attendances) alert('출근 기록이 아직 없습니다.') // 데이터 없음 컴포넌트 하나 만들어서 던질 것. 출근 기록 없을 수도.
  if (!Report) alert('레포트가 아직 없습니다.') // 데이터 없음 컴포넌트 필요
  if (!ProfileDetail) alert('세부사항이 아직 없습니다.')

  const time = Attendances?.map((attendance) => attendance.time)
  const date = Attendances?.map((attendance) => attendance.date)

  const buttons = [
    { content: '출결 현황' },
    { content: '최근 리포트' },
    { content: '개인 세부사항' },
  ]

  return (
    <div className="flex-1 border-t border-black relative">
      <div
        className="absolute w-40 h-1 bg-text-darkgray rounded-sm"
        style={{
          top: '-2px',
          transform: `translateX(${activeBtn * 10 + activeBtn * 1.25}rem)`,
          transition: 'transform 0.3s',
        }}
      />
      <div className="flex mt-2 gap-5 text-lg font-semibold">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`w-40 ${
              activeBtn === index ? 'text-text-default' : 'text-text-gray'
            }`}
            style={{ transition: 'color 0.2s ease-in-out' }}
            onClick={() => setActiveBtn(index)}
          >
            {button.content}
          </button>
        ))}
      </div>
      <div className="mt-6 px-12">
        {activeBtn === 0
          ? Attendances &&
            time &&
            date && <CommuteGraph time={time} date={date} />
          : activeBtn === 1
            ? Report && <RecentReport reports={Report} />
            : ProfileDetail && <DetailInfo detailInfo={ProfileDetail} />}
      </div>
    </div>
  )
}
