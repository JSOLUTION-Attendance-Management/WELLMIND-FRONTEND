import { useEffect, useState } from 'react'

import { ColumnDef } from '@tanstack/react-table'

import { useGetMyTransfer } from '@/api/services/transfer/myTransfer.api'
import { Pagination } from '@/components/Pagination'
import CommuteTable from '@/components/ReportTable/CommuteTable'
import LoadingPage from '@/pages/LoadingPage'
import { transformGroupedData } from '@/pages/TransferDeptPage/transformGroupedData'
import { TransferDeptItem, TransferDeptTable } from '@/types'

export default function TransferDeptPage() {
  const [reports, setReports] = useState<TransferDeptTable>([])
  const [tableList, setTableList] = useState<TransferDeptTable>()
  const [currentPage, setCurrentPage] = useState(0)
  const {
    data: Transfer,
    isLoading,
    isPending,
    error,
  } = useGetMyTransfer({ page: currentPage, size: 9 })

  useEffect(() => {
    setTableList(reports)
  }, [reports])

  useEffect(() => {
    if (Transfer && Transfer.content.length > 0) {
      const transformedData = transformGroupedData({
        transferData: Transfer.content,
      })
      setReports(transformedData)
    } else {
      setReports([])
    }
  }, [Transfer])

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1)
  }

  const columns: ColumnDef<TransferDeptItem>[] = [
    { accessorKey: 'id', enableHiding: true },
    { header: '날짜', accessorKey: 'date' },
    { header: '유형', accessorKey: 'type' },
    { header: '이전 부서/직책', accessorKey: 'previous' },
    { header: '배치 부서/직책', accessorKey: 'update' },
    { header: '사유', accessorKey: 'reason' },
    { header: '상신자', accessorKey: 'recipient' },
  ]

  if (isLoading || isPending) return <LoadingPage />
  if (error) throw Error()

  return (
    <div className="w-full py-5 flex flex-col gap-5">
      <div className="flex gap-10">
        <div className="text-2xl text-text-default font-bold">
          인사 이동 기록
        </div>
      </div>
      <div className="px-10">
        {reports && tableList && (
          <CommuteTable reports={tableList} columns={columns} />
        )}
      </div>
      <Pagination
        currentPage={currentPage + 1}
        totalPage={Transfer?.totalPages ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
