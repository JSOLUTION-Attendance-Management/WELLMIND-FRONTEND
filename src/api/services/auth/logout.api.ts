import { useMutation } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'

const logout = async () => {
  const response = await authorizationInstance.post('/api/public/logout')
  return response.data
}

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  })
}
