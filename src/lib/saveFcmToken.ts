import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Platform } from 'react-native'

/**
 * @param token {string}
 *
 * @returns {Promise<void>}.
 */
export const saveFcmToken = async (token: string): Promise<void> => {
  let currentUser = auth().currentUser

  if (!currentUser) {
    const userCredential = await auth().signInAnonymously()
    currentUser = userCredential.user
  }

  await firestore()
    .collection('fcmTokens')
    .doc(currentUser.uid)
    .set({
      token,
      userId: currentUser.uid,
      timestamp: firestore.FieldValue.serverTimestamp(),
      deviceInfo: {
        platform: Platform.OS,
        version: Platform.Version
      }
    })
}
