import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

/**
 * Requests notification permissions asynchronously.
 *
 * This function handles the permission request for both Android and iOS platforms.
 * On Android, it sets up the notification channel with specific configurations.
 * On iOS, it requests permissions with alert, badge, and sound options.
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the permissions were granted.
 *
 * @example
 * ```typescript
 * const permissionsGranted = await requestPermissionsAsync();
 * if (permissionsGranted) {
 *   console.log('Permissions granted');
 * } else {
 *   console.log('Permissions denied');
 * }
 * ```
 */
export const requestPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
    Notifications.setNotificationChannelAsync('promotions', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  const status = await Notifications.getPermissionsAsync()
  let finalStatus = status

  if (
    !status.granted ||
    status.ios?.status !== Notifications.IosAuthorizationStatus.DENIED
  ) {
    const status = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true
      }
    })
    finalStatus = status
  }

  if (
    finalStatus.granted ||
    status.ios?.status !== Notifications.IosAuthorizationStatus.DENIED
  ) {
    return true
  }

  console.log('Permisos de notificacciones denegados: ', finalStatus)
  return false
}
