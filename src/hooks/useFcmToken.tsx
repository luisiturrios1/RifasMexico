import messaging from '@react-native-firebase/messaging'
import { useEffect } from 'react'

import { saveFcmToken } from '@/lib/saveFcmToken'

export const useFcmToken = () => {
  useEffect(() => {
    messaging().onTokenRefresh(async (token) => {
      await saveFcmToken(token)
    })
  }, [])
}
