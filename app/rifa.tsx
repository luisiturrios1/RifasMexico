import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import moment from 'moment';
import 'moment/locale/es';
import React from "react";
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"; // Puedes cambiar por otra librería de íconos


import { Emision } from '@/components/Emision';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { fetchCover } from '@/lib/cover';
import { fetchRifa } from '@/lib/rifa';
import { fetchSettings } from '@/lib/setting';

type Params = {
  rifaId: string;
};

export default function RifaScreen() {
  const { rifaId } = useLocalSearchParams<Params>();
  const colorScheme = useColorScheme();

  const rifaQuery = useQuery({
    queryKey: ['rifa', rifaId],
    queryFn: async () => fetchRifa(rifaId),
  });

  const api = rifaQuery.data?.api;

  const coverQuery = useQuery({
    enabled: !!api,
    queryKey: ['rifa', 'cover', rifaId],
    queryFn: async () => fetchCover(api),
  });

  const sorteoId = coverQuery.data?.link;

  const settingsQuery = useQuery({
    queryKey: ['rifa', 'settings', rifaId, sorteoId],
    queryFn: async () => fetchSettings(api, sorteoId),
    enabled: !!sorteoId
  });

  const openURL = (url?: string): void => {
    if (!url) {
      console.warn("La URL está vacía o no está definida.");
      return;
    }

    Linking.openURL(url).catch((err) => {
      console.error("No se pudo abrir la URL:", err);
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={{ uri: coverQuery.data?.imageUrl }}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <Image source={{ uri: rifaQuery.data?.logo }} style={styles.avatar} />
        <ThemedText type="title">{rifaQuery.data?.nombre}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.detailsContainer}>
        <ThemedView>
          <ThemedText type='subtitle'>Sorteo</ThemedText>
          <ThemedText>S{coverQuery.data?.link}</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText type='subtitle' style={{ textAlign: "right" }}>Fecha</ThemedText>
          <ThemedText style={{ textAlign: "right" }}>{moment(settingsQuery.data?.raffleDate).format("D [de] MMMM")}</ThemedText>
        </ThemedView>
      </ThemedView>
      {rifaQuery.isFetched &&
        <>
          <Emision api={api} rifaId={rifaId} sorteoId={sorteoId} />
          <ThemedView style={styles.containerBoxes}>
            <TouchableOpacity
              style={[{ backgroundColor: Colors[colorScheme ?? 'light'].boxBackgroundColor, }, styles.box]}
              onPress={() => { openURL(rifaQuery.data?.website + `s${sorteoId}-lista`) }}
            >
              <Icon name="globe-outline" size={35} color={Colors[colorScheme ?? 'light'].text} />
              <ThemedText>WebSite</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[{ backgroundColor: Colors[colorScheme ?? 'light'].boxBackgroundColor, }, styles.box]}
              onPress={() => { openURL(rifaQuery.data?.facebook) }}
            >
              <Icon name="logo-facebook" size={35} color={Colors[colorScheme ?? 'light'].text} />
              <ThemedText>Facebook</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[{ backgroundColor: Colors[colorScheme ?? 'light'].boxBackgroundColor, }, styles.box]}
              onPress={() => { openURL(rifaQuery.data?.website + `s${sorteoId}-verificador`) }}
            >
              <Icon name="checkmark-circle" size={35} color={Colors[colorScheme ?? 'light'].text} />
              <ThemedText>Verificador</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[{ backgroundColor: Colors[colorScheme ?? 'light'].boxBackgroundColor, }, styles.box]}
              onPress={() => { openURL(rifaQuery.data?.website + "pagos") }}
            >
              <Icon name="cash" size={35} color={Colors[colorScheme ?? 'light'].text} />
              <ThemedText>Pagos</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </>
      }
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 250,
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerBoxes: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
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
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
});
