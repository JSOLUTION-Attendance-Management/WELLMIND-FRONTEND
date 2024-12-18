import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

import { ColumnDef } from '@tanstack/react-table'

import { useGetAttend } from '@/api/services/attendances/commute.api'
import { Pagination } from '@/components/Pagination'
import CommuteTable from '@/components/ReportTable/CommuteTable'
import { transformGroupedData } from '@/pages/CommutePage/transformGroupedData'
import LoadingPage from '@/pages/LoadingPage'
import { CommuteItem, CommuteReportItem, CommuteReportTable } from '@/types'

type GroupedData = {
  date: string
  items: CommuteItem[]
}[]

export default function CommutePage() {
  const [reports, setReports] = useState<CommuteReportTable>([])
  const [tableList, setTableList] = useState<CommuteReportTable>()
  const [groupedData, setGroupedData] = useState<GroupedData>([])
  const [currentPage, setCurrentPage] = useState(0)

  const {
    data: AttendData,
    isLoading,
    isPending,
    error,
  } = useGetAttend({ page: currentPage, size: 9 })

  useEffect(() => {
    setTableList(reports)
  }, [reports])

  useEffect(() => {
    if (AttendData?.content && AttendData.content.length > 0) {
      const grouped = groupDataByDate(AttendData.content)
      setGroupedData(grouped)
    } else {
      setGroupedData([])
    }
  }, [AttendData])

  useEffect(() => {
    if (groupedData.length > 0) {
      const transformedData = transformGroupedData(groupedData)
      setReports(transformedData)
    } else {
      setReports([])
    }
  }, [groupedData])

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1)
  }

  if (isLoading || isPending) return <LoadingPage />
  if (error) {
    throw new Error('Error loading data')
  }

  function groupDataByDate(data: CommuteItem[]): GroupedData {
    return data.reduce<GroupedData>((acc, curr) => {
      const group = acc.find((g) => g.date === curr.date)
      if (group) {
        group.items.push(curr)
      } else {
        acc.push({ date: curr.date, items: [curr] })
      }
      return acc
    }, [])
  }

  const columns: ColumnDef<CommuteReportItem>[] = [
    { accessorKey: 'id', enableHiding: true },
    { header: '날짜', accessorKey: 'date' },
    { header: '근무 형태', accessorKey: 'type' },
    { header: '출근 시간', accessorKey: 'goTime' },
    { header: '퇴근 시간', accessorKey: 'leaveTime' },
    {
      header: '지각 여부',
      accessorKey: 'isLate',
      cell: (info) => (info.getValue<boolean>() ? 'O' : 'X'),
    },
  ]

  return (
    <div className="w-full py-5 flex flex-col gap-5">
      <div className="flex gap-10">
        <div className="text-2xl text-text-default font-bold">출퇴근 기록</div>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            className="border rounded-md px-3 border-text-gray"
          />
          <div>~</div>
          <input
            type="date"
            className="border rounded-md px-3 border-text-gray"
          />
          <button className="bg-background-purple text-text-white pl-5 pr-6 rounded-md ml-2 py-0.5 hover:bg-primary-700 focus:bg-primary-900">
            <div className="flex gap-1 items-center">
              <BiSearch className="w-5 h-5" />
              <div>조회</div>
            </div>
          </button>
        </div>
      </div>
      <div className="px-10">
        {tableList && reports.length > 0 && (
          <CommuteTable reports={reports} columns={columns} />
        )}
      </div>
      <Pagination
        currentPage={currentPage + 1}
        totalPage={AttendData?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
