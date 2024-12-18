import { useEffect, useState } from 'react'
import { BiShow } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { useGetAllEmployees } from '@/api/services/admin/allEmployees.api'
import {
  ConfirmModal,
  ConfirmModalButton,
} from '@/components/Modal/ConfirmModal'
import { FormModal } from '@/components/Modal/FormModal'
import EmployeeSlider from '@/pages/EmployeeInfoPage/EmployeeSlider'
import LoadingPage from '@/pages/LoadingPage'

export default function EmployeeInfoPage() {
  const navigate = useNavigate()
  const { data: AllEmployees, isLoading, error } = useGetAllEmployees()

  const [confirmIsOpen, setConfirmIsOpen] = useState(false)
  const [formIsOpen, setFormIsOpen] = useState(false)
  const [groupedEmployees, setGroupedEmployees] = useState<
    { departName: string; employees: typeof AllEmployees }[]
  >([])
  const [selectEmployeeId, setSelectEmployeeId] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [isReasonValid, setIsReasonValid] = useState(true)

  useEffect(() => {
    if (AllEmployees && AllEmployees.length > 0) {
      const grouped = AllEmployees.reduce(
        (acc, employee) => {
          const { departName } = employee

          const group = acc.find((item) => item.departName === departName)
          if (group) {
            group.employees.push(employee)
          } else {
            acc.push({
              departName,
              employees: [employee],
            })
          }
          return acc
        },
        [] as { departName: string; employees: typeof AllEmployees }[]
      )

      setGroupedEmployees(grouped)
    }
  }, [AllEmployees])

  useEffect(() => {
    console.log(selectEmployeeId)
  }, [selectEmployeeId])

  if (isLoading) return <LoadingPage />
  if (error) throw Error()

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value)
  }

  const handleSubmit = () => {
    if (!reason.trim()) {
      setIsReasonValid(false)
      return
    }
    setFormIsOpen(false)
    navigate(`/employee-info/${selectEmployeeId}`)
  }

  return (
    <div className="w-full h-full pt-5 flex flex-col gap-7 text-text-default">
      <div className="flex justify-between">
        <div className="text-2xl text-text-default font-bold">직원 조회</div>
        <button
          onClick={() => navigate('/new-employee')}
          className="rounded-sm bg-background-default px-4 font-semibold hover:bg-background-light"
        >
          직원 생성
        </button>
      </div>
      <div className="w-full flex-1 flex flex-col gap-5 h-full overflow-y-auto">
        {groupedEmployees?.length > 0 &&
          groupedEmployees.map((group) => (
            <EmployeeSlider
              key={group.departName}
              departName={group.departName}
              employees={group.employees || []}
              setConfirmIsOpen={() => setConfirmIsOpen(true)}
              setSelectEmployeeId={(id: string) => setSelectEmployeeId(id)}
            />
          ))}
      </div>
      <ConfirmModal
        isOpen={confirmIsOpen}
        onClose={() => setConfirmIsOpen(false)}
        icon={<BiShow />}
        title={`직원 정보를 조회하시겠습니까?`}
        description={
          '직원 정보 조회를 위해서는 권한 인증과 조회 사유가 필요합니다.'
        }
        confirmButton={
          <ConfirmModalButton
            onClick={() => {
              setConfirmIsOpen(false)
              setFormIsOpen(true)
            }}
          >
            확인
          </ConfirmModalButton>
        }
      />
      <FormModal
        isOpen={formIsOpen}
        onClose={() => setFormIsOpen(false)}
        icon={<BiShow />}
        title="직원 조회 사유"
        description="직원 정보 조회를 위한 사유를 작성해주세요."
        confirmButton={
          <ConfirmModalButton onClick={handleSubmit}>확인</ConfirmModalButton>
        }
      >
        <div className="mt-4">
          <input
            type="text"
            value={reason}
            onChange={handleReasonChange}
            placeholder="사유를 입력하세요"
            className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-none ${
              !isReasonValid ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {!isReasonValid && (
            <p className="text-red-500 text-xs mt-1">사유 작성은 필수입니다.</p>
          )}
        </div>
      </FormModal>
    </div>
  )
}
