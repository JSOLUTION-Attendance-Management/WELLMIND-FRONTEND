import { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'

import logo from '@/assets/logo.svg'
import {
  LoginButton,
  ResetButton,
} from '@/pages/Layout/GlobalErrorFallback/ErrorButton'

export const GlobalErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const { status } = error
  const { message, ErrorButton } = getErrorDetail(status)

  const navigate = useNavigate()

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <img className="w-44 my-2" src={logo} alt="" />
      <div className="text-3xl my-1 font-semibold text-text-default">
        {message}
      </div>
      <div className="flex gap-8 my-5">
        {status !== 401 && (
          <button
            className="text-default-gray outline rounded-sm px-2 py-1 hover:bg-background-light"
            onClick={() => {
              resetErrorBoundary()
              navigate(-1)
            }}
          >
            이전으로
          </button>
        )}
        <ErrorButton error={error} resetErrorBoundary={resetErrorBoundary} />
      </div>
    </div>
  )
}

const getErrorDetail = (status?: number) => {
  switch (status) {
    case 400:
      return {
        message: '잘못된 요청입니다.',
        ErrorButton: ResetButton,
      }
    case 401:
      return {
        message: '로그인 후 이용해주세요.',
        ErrorButton: LoginButton,
      }
    case 403:
      return {
        message: '접근 권한이 없습니다.',
        ErrorButton: ResetButton,
      }
    case 404:
      return {
        message: '요청한 데이터를 찾을 수 없습니다.',
        ErrorButton: ResetButton,
      }
    case 409:
      return {
        message: '중복된 요청입니다.',
        ErrorButton: ResetButton,
      }
    case 500:
      return {
        message: '서버 에러가 발생했습니다.\n관리자에게 문의해주세요.',
        ErrorButton: ResetButton,
      }
    default:
      return {
        message: '예기치 않은 오류가 발생했습니다.\n관리자에게 문의해주세요.',
        ErrorButton: ResetButton,
      }
  }
}
