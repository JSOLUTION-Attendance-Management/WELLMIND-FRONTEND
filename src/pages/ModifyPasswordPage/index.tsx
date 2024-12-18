import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { ModifyPassword } from '@/api/services/auth/modifyPassword.api'
import { ModifyPasswordItem } from '@/types'

export default function ModifyPasswordPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<ModifyPasswordItem>()

  const { mutate: submitModifyPassword } = useMutation({
    mutationFn: (data: ModifyPasswordItem) => ModifyPassword(data),
    onSuccess: () => {
      alert('비밀번호가 성공적으로 변경되었습니다!')
      navigate('/error')
    },
    onError: () => {
      alert('비밀번호 변경 중 오류가 발생했습니다.')
    },
  })

  const onSubmit: SubmitHandler<ModifyPasswordItem> = (data) => {
    const newPassword = watch('newPassword')
    const confirmNewPassword = watch('confirmNewPassword')

    if (newPassword !== confirmNewPassword) {
      setError('confirmNewPassword', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다.',
      })
      return
    }
    submitModifyPassword(data)
  }

  return (
    <div className="w-full flex justify-center bg-background-light py-10 mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/5 flex flex-col gap-3 text-text-default items-center max-w-xs"
      >
        <div className="text-xl font-bold mb-5">비밀번호 변경</div>

        <div className="flex w-80 justify-between items-center">
          <label htmlFor="oldPassword" className="mb-1">
            이전 비밀번호
          </label>
          <input
            id="oldPassword"
            type="password"
            {...register('oldPassword', { required: '필수' })}
            className="border border-text-darkgray rounded-sm px-2 h-8"
            style={{ width: '200px' }}
          />
          {errors.oldPassword && (
            <span className="text-red-500 text-sm">필수</span>
          )}
        </div>

        <div className="flex w-80 justify-between items-center">
          <label htmlFor="newPassword" className="mb-1">
            새 비밀번호
          </label>
          <input
            id="newPassword"
            type="password"
            {...register('newPassword', { required: '필수' })}
            className="border border-text-darkgray rounded-sm px-2 h-8"
            style={{ width: '200px' }}
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">필수</span>
          )}
        </div>

        <div className="flex w-80 justify-between items-center">
          <label htmlFor="confirmNewPassword" className="mb-1">
            비밀번호 확인
          </label>
          <input
            id="confirmNewPassword"
            type="password"
            {...register('confirmNewPassword', { required: '필수' })}
            className="border border-text-darkgray rounded-sm px-2 h-8"
            style={{ width: '200px' }}
          />
        </div>
        {errors.confirmNewPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmNewPassword.message}
          </span>
        )}

        {/* 버튼 */}
        <button
          type="submit"
          className="bg-red-100 rounded-md px-4 py-1 text-lg font-semibold hover:bg-red-200 mt-4"
        >
          확인
        </button>
      </form>
    </div>
  )
}
