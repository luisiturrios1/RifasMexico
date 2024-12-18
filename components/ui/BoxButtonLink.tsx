import Icon from '@expo/vector-icons/Ionicons';
import { openBrowserAsync } from 'expo-web-browser';
import React, { PropsWithChildren } from "react";
import { Linking, Platform, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme.web';

type Props = PropsWithChildren<{
  iconName: string;
  href?: string;
}>;

export const BoxButtonLink: React.FC<Props> = ({ iconName, children, href }) => {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].boxBackgroundColor;
  const iconColor = Colors[colorScheme ?? 'light'].text;

  if (!href) {
    console.warn("Se intentó renderear BoxButtonLink sin un href válido.");
    return null;
  }

  const onPress = async () => {
    try {
      if (Platform.OS !== 'web') {
        await openBrowserAsync(href);
      } else {
        await Linking.openURL(href);
      }
    } catch (error) {
      console.error("Error al abrir la URL:", error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.box, { backgroundColor }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${children}`}
    >
      <Icon name={iconName} size={35} color={iconColor} />
      <ThemedText>{children}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 85,
    height: 85,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 8,
  },
});
