import { saveFcmToken } from '@/lib/saveFcmToken';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from "react";

export const useFcmToken = () => {
  useEffect(() => {
    messaging().onTokenRefresh(async (token) => {
      await saveFcmToken(token);
    });
  }, []);
};
