import { authorizationInstance } from '@/api/instance'
import { ModifyPasswordItem } from '@/types'

export const ModifyPassword = async ({
  oldPassword,
  newPassword,
  confirmNewPassword,
}: ModifyPasswordItem) => {
  const response = await authorizationInstance.put(
    '/api/public/modify-by-password',
    {
      oldPassword,
      newPassword,
      confirmNewPassword,
    }
  )

  return response.data.message
}
