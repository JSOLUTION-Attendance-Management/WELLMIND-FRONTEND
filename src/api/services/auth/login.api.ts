import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { fetchInstance } from '@/api/instance'
import { useAppDispatch } from '@/store/hooks/useAppDispatch'
import { setAuthToken } from '@/store/slices/authToken'
import { LoginRequest } from '@/types'

const postLogin = async ({
  employeeId,
  password,
}: LoginRequest): Promise<
  boolean | { accessToken: string; refreshToken: string }
> => {
  const response = await fetchInstance.post('/api/public/login', {
    employeeId,
    password,
  })

  if (response.status === 200) {
    return {
      accessToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken,
    }
  } else if (response.status === 404 || response.status === 400) {
    alert(
      '아이디 또는 비밀번호가 잘못 되었습니다.\n아이디와 비밀번호를 정확히 입력해 주세요.'
    )
    return false
  } else if (response.status === 409) {
    alert('이미 로그인 된 계정입니다.')
    return false
  }

  return false
}

export const usePostLogin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (
      data: { accessToken?: string; refreshToken?: string } | boolean
    ) => {
      if (
        data &&
        typeof data === 'object' &&
        data.accessToken &&
        data.refreshToken
      ) {
        dispatch(
          setAuthToken({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        )
        navigate('/main')
      }
    },
    onError: () => {},
  })
}
