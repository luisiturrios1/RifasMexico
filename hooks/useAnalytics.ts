import analytics from "@react-native-firebase/analytics";
import { useGlobalSearchParams, usePathname } from "expo-router";
import { useEffect } from "react";

export const useAnalytics = () => {
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  useEffect(() => {
    const logScreenView = async () => {
      const paramsString = paramsToString(params);
      await analytics().logScreenView({
        screen_name: `${pathname}${paramsString}`,
        screen_class: pathname,
      });
    };
    logScreenView();
  }, [pathname, params]);
};

const paramsToString = (params: Record<string, any>): string => {
  if (Object.keys(params).length == 0) {
    return "";
  }
  return (
    "?" +
    Object.keys(params)
      .map((key) => key !== "__EXPO_ROUTER_key" && `${key}=${params[key]}`)
      .join("&")
  );
};
