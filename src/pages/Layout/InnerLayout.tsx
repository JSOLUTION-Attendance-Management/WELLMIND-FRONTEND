import { ReactNode, startTransition } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BiSearch } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import { useQueryErrorResetBoundary } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { useLogout } from '@/api/services/auth/logout.api'
import logo from '@/assets/logo.svg'
import { GlobalErrorFallback } from '@/pages/Layout/GlobalErrorFallback'
import LoadingPage from '@/pages/LoadingPage'
import { deleteAuthToken } from '@/store/slices/authToken'

interface InnerLayoutProps {
  children?: ReactNode
}

export const InnerLayout = ({ children }: InnerLayoutProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { reset } = useQueryErrorResetBoundary()
  const { mutate: handleLogout, status } = useLogout()

  const onLogoutClick = () => {
    handleLogout(undefined, {
      onSuccess: () => {
        queryClient.clear()
        dispatch(deleteAuthToken())
        startTransition(() => {
          navigate('/login')
        })
      },
    })
  }

  if (status === 'pending') return <LoadingPage />

  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback} onReset={reset}>
      <div className="w-full w-full flex flex-col h-screen">
        <div className="w-full h-20 bg-white flex items-center px-20 justify-between">
          <img
            className="h-12 cursor-pointer"
            src={logo}
            alt="Jsolution"
            onClick={() => {
              navigate('/main')
            }}
          />
          <div className="flex items-center border border-gray-400 rounded-sm px-2">
            <BiSearch className="text-gray-400 mr-2" />
            <input
              className="flex-1 outline-none h-9 w-72"
              type="text"
              placeholder="직원 검색"
            />
          </div>
          <div className="flex md:gap-4 lg:gap-6 xl:gap-10 h-full">
            <button
              className="text-lg text-text-default"
              onClick={() => {
                navigate('/modify-password')
              }}
            >
              비밀번호 수정
            </button>
            <button
              className="text-lg text-text-default"
              onClick={() => {
                navigate('/report')
              }}
            >
              리포트
            </button>
            <button className="text-lg text-text-default">메세지</button>
            <button
              onClick={onLogoutClick}
              className="text-lg text-text-default"
            >
              로그아웃
            </button>
            <div className="flex h-2/3 relative my-auto">
              <img
                className="h-full rounded-full"
                src="https://ifh.cc/g/PVdXh3.jpg"
                alt="profile"
              />
              <div className="absolute right-1 w-3 h-3 bg-green-600 rounded-full border border-black" />
            </div>
          </div>
        </div>
        <div className="flex-1 px-40 py-2 overflow-hidden">
          {children || <Outlet />}
        </div>
      </div>
    </ErrorBoundary>
  )
}
