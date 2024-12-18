import { FallbackProps } from 'react-error-boundary'
import { Link } from 'react-router-dom'

export const ResetButton = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <button
      className="bg-red-100 text-red-500 rounded-sm outline px-2 py-1"
      onClick={() => resetErrorBoundary()}
    >
      다시시도
    </button>
  )
}

export const LoginButton = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Link to="/login">
      <button
        className="text-text-white bg-red-500 rounded-md px-3 py-1.5 hover:bg-red-600"
        onClick={() => resetErrorBoundary()}
      >
        로그인하기
      </button>
    </Link>
  )
}
