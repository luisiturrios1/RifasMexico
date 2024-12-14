import { StyleSheet, ViewStyle } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme.web';

interface ProgressBarProps {
  progress: number;
  height?: number;
  style?: ViewStyle;
}

export const ProgressBar = function ({
  progress,
  height = 10,
  style = {},
}: ProgressBarProps) {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      style={
        [
          styles.container,
          { height },
          style,
        ]}
    >
      <ThemedView
        style={[
          styles.progress,
          {
            width: `${progress}%`,
            backgroundColor: Colors[colorScheme ?? 'light'].tint,
          },
        ]}
      />
    </ThemedView >
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 5,
  },
});
