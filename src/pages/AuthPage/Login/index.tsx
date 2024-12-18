import { useForm } from 'react-hook-form'

import { usePostLogin } from '@/api/services/auth/login.api'
import { LoginRequest } from '@/types'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>()
  const { mutate } = usePostLogin()

  const onSubmit = async (data: LoginRequest) => {
    await mutate(data)
  }

  return (
    <div className="flex flex-col w-1/3 min-w-64 gap-4 rounded-md shadow-xl p-8 border border-slate-100 bg-white">
      <div>
        <div className="text-2xl font-semibold">환영합니다</div>
        <div className="">효율적인 인사 관리 시스템</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="text-lg text-text-default">사번</label>
          <input
            type="text"
            className="w-full text-xl rounded-md border-2 border-solid border-text-light focus:border-text-secondary focus:outline-none px-2 py-1"
            {...register('employeeId', { required: '사번은 필수입니다.' })}
          />
          {errors.employeeId && (
            <p className="text-red-500 text-sm">{errors.employeeId.message}</p>
          )}
        </div>
        <div>
          <label className="text-lg text-text-default">비밀번호</label>
          <input
            type="password"
            className="w-full text-xl rounded-md border-2 border-solid border-text-light focus:border-text-secondary focus:outline-none px-2 py-1"
            {...register('password', { required: '비밀번호는 필수입니다.' })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <div className="w-full flex justify-end text-text-darkgray pt-1">
            <button>비밀번호 찾기</button>
          </div>
        </div>
        <button
          type="submit"
          className="text-white text-xl font-semibold rounded-xl bg-primary-800 py-1 my-3 hover:bg-primary-700 focus:bg-primary-800"
        >
          Login
        </button>
      </form>
    </div>
  )
}
