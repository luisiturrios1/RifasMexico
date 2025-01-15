import { useEffect } from 'react'

import { requestPermissions } from '@/lib/requestPermissions'

export const useNotifications = (timeout: number = 0) => {
  useEffect(() => {
    setTimeout(() => {
      requestPermissions()
    }, timeout)
  })
}
