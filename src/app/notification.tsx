import * as Notifications from 'expo-notifications'
import { router, useNavigation } from 'expo-router'
import { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme.web'

export default function Notification() {
  const navigation = useNavigation()
  const colorScheme = useColorScheme()
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null)

  const backgroundColor = Colors[colorScheme ?? 'light'].boxBackgroundColor
  const color = Colors[colorScheme ?? 'light'].text

  useLayoutEffect(() => {
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response?.notification) {
        setNotification(response.notification)
        navigation.setOptions({
          title: response.notification?.request.content.title
        })
      }
    })
  }, [navigation])

  const handleClose = () => {
    navigation.goBack()
  }

  const handleOk = () => {
    const url = notification?.request?.trigger?.payload?.url
    if (url) {
      router.replace(url)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText
        style={{ marginTop: 10 }}
        type="defaultSemiBold"
      >
        {notification?.request.content.body}
      </ThemedText>
      {notification?.request?.trigger?.payload?.description && (
        <ThemedText
          type="small"
          style={{ marginTop: 10 }}
        >
          {notification.request.trigger.payload.description}
        </ThemedText>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.closeButton, { backgroundColor }]}
          onPress={handleClose}
        >
          <Text style={[styles.buttonText, { color }]}>Cerrar</Text>
        </TouchableOpacity>
        {notification?.request?.trigger?.payload?.url && (
          <TouchableOpacity
            style={[styles.button, styles.okButton, { backgroundColor }]}
            onPress={handleOk}
          >
            <Text style={[styles.buttonText, { color }]}>Aceptar</Text>
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5
  },
  closeButton: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5
  },
  okButton: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600'
  }
})
