import { requestPermissions } from "@/lib/requestPermissions";
import { useEffect } from "react";

export const useNotifications = (timeout: number = 0) => {
  useEffect(() => {
    setTimeout(() => {
      requestPermissions();
    }, timeout);
  });
};
