import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { useEffect, useRef } from 'react'

export const useNotificationObserver = () => {
  const receivedListener = useRef<Notifications.EventSubscription>()
  const responseListener = useRef<Notifications.EventSubscription>()

  useEffect(() => {
    receivedListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification)
      }
    )

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(() => {
        setTimeout(() => {
          router.push('/notification')
        }, 1)
      })

    return () => {
      receivedListener.current &&
        Notifications.removeNotificationSubscription(receivedListener.current)
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])
}
