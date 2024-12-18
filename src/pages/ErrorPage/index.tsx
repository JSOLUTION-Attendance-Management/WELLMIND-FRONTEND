import { useNavigate } from 'react-router-dom'

import logo from '@/assets/logo.svg'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <img className="w-44 my-2" src={logo} alt="" />
      <div className="text-3xl my-1 font-semibold text-text-default">
        로그인 후 이용해주세요.
      </div>
      <div className="flex gap-8 my-5">
        <button
          className="bg-red-100 text-red-500 outline rounded-sm px-2 py-1 hover:bg-red-200"
          onClick={() => {
            navigate('/login')
          }}
        >
          로그인
        </button>
      </div>
    </div>
  )
}
