import { SubmitHandler, useForm } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'

import { postNewEmployee } from '@/api/services/admin/newEmployee.api'

export type NewEmployeeItem = {
  name: string
  email: string
  phoneNum: string
  employeeId: string
  authType: string
  departName: string
  positionName: string
}

export default function NewEmployeePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEmployeeItem>()

  const { mutate: submitNewEmployee } = useMutation({
    mutationFn: (newEmployee: NewEmployeeItem) => postNewEmployee(newEmployee),
    onSuccess: () => {
      alert('직원이 성공적으로 추가되었습니다!')
      window.location.reload()
    },
    onError: () => {
      alert('직원 추가 중 오류가 발생했습니다.')
    },
  })

  const onSubmit: SubmitHandler<NewEmployeeItem> = (data) => {
    submitNewEmployee(data)
  }

  return (
    <div className="w-full flex justify-center bg-background-light py-10 mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/5 flex flex-col gap-3 text-text-default items-center max-w-xs"
      >
        <div className="text-xl font-bold mb-5">새 직원 추가</div>

        {/* 이름 */}
        <div className="flex w-72 justify-between items-center">
          <label htmlFor="name" className="mb-1">
            이름
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: '필수' })}
            className="border border-text-darkgray rounded-sm px-2 h-8"
            style={{ width: '200px' }}
          />
          {errors.name && <span className="text-red-500 text-sm">필수</span>}
        </div>

        {/* 이메일 */}
        <div className="flex w-72 justify-between items-center">
          <label htmlFor="email" className="mb-1">
            이메일
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: '필수',
            })}
            className="border border-text-darkgray rounded-sm px-2 h-8"
            style={{ width: '200px' }}
          />
          {errors.email && <span className="text-red-500 text-sm">필수</span>}
        </div>

        {/* 전화번호 */}
        <div className="flex w-72 justify-between items-center">
          <label htmlFor="phoneNum" className="mb-1">
            전화번호
          </label>
          <input
            id="phoneNum"
            type="text"
            placeholder="010-0000-0000"
            {...register('phoneNum', {
              required: '필수',
            })}
            className="border border-text-darkgray rounded-sm px-2 h-8"
            style={{ width: '200px' }}
          />
          {errors.phoneNum && (
            <span className="text-red-500 text-sm">필수</span>
          )}
        </div>

        {/* 사번 */}
        <div className="flex w-72 justify-between items-center">
          <label htmlFor="employeeId" className="mb-1">
            사번
          </label>
          <input
            id="employeeId"
            type="text"
            {...register('employeeId', {
              required: '필수',
            })}
            className="border border-text-darkgray rounded-sm px-2 h-8"
            style={{ width: '200px' }}
          />
          {errors.employeeId && (
            <span className="text-red-500 text-sm">필수</span>
          )}
        </div>

        {/* 관리자 유무 */}
        <div className="flex w-72 justify-between items-center">
          <label htmlFor="authType" className="mb-1">
            관리자 유무
          </label>
          <select
            id="authType"
            {...register('authType', {
              required: '관리자 유무를 선택해주세요.',
            })}
            className="border border-text-darkgray rounded-sm px-2 h-8 w-48"
            style={{ width: '200px' }}
          >
            <option value="">선택</option>
            <option value="M">M</option>
            <option value="N">N</option>
          </select>
          {errors.authType && (
            <span className="text-red-500 text-sm">필수</span>
          )}
        </div>

        {/* 배치 부서 */}
        <div className="flex w-72 justify-between items-center">
          <label htmlFor="departName" className="mb-1">
            배치 부서
          </label>
          <input
            id="departName"
            type="text"
            {...register('departName', {
              required: '필수',
            })}
            className="border border-text-darkgray rounded-sm px-2 h-8"
            style={{ width: '200px' }}
          />
          {errors.departName && (
            <span className="text-red-500 text-sm">필수</span>
          )}
        </div>

        {/* 직급 */}
        <div className="flex w-72 justify-between items-center">
          <label htmlFor="positionName" className="mb-1">
            직급
          </label>
          <input
            id="positionName"
            type="text"
            {...register('positionName', {
              required: '필수',
            })}
            className="border border-text-darkgray rounded-sm px-1 h-8"
            style={{ width: '200px' }}
          />
          {errors.positionName && (
            <span className="text-red-500 text-sm">필수</span>
          )}
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          className="bg-red-100 rounded-md px-4 py-1 text-lg font-semibold hover:bg-red-200 mt-4"
        >
          직원 생성
        </button>
      </form>
    </div>
  )
}
