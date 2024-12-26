import { getNotificationsToken } from "@/lib/registerNotifications";
import { useEffect } from "react";

export const useNotifications = () => {
  useEffect(() => {
    getNotificationsToken();
  });
};
