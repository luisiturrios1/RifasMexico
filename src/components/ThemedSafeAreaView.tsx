import { useThemeColor } from '@/hooks/useThemeColor';
import Constants from 'expo-constants';
import { Platform, SafeAreaView, StyleSheet, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSafeAreaView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <SafeAreaView style={[{ backgroundColor }, styles.container, style]} {...otherProps} />;
}


const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    flex: 1,
  },
});
