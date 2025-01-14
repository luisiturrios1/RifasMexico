import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useRef } from "react";

export const useNotificationObserver = () => {
  const responseListener = useRef<Notifications.EventSubscription>();

  const redirect = (notification: Notifications.Notification, timeout: number = 1) => {
    const url = notification.request.trigger?.payload?.url;
    if (url) {
      setTimeout(() => {
        router.push(url);
      }, timeout);
    }
  }

  useEffect(() => {
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        redirect(response.notification);
      });

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    return () => {
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
};
