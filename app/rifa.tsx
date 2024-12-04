import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import moment from 'moment';
import 'moment/locale/es';
import { Image, StyleSheet } from 'react-native';

import { ExternalLink } from '@/components/ExternalLink';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchCover } from '@/lib/cover';
import { fetchRifasById } from '@/lib/dbRifas';
import { fetchSettings } from '@/lib/setting';

type Params = {
  rifaId: string;
};

export default function RifaScreen() {
  const { rifaId } = useLocalSearchParams<Params>();

  const rifaQuery = useQuery({
    queryKey: ['rifa', rifaId],
    queryFn: async () => fetchRifasById(rifaId),
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
          <ThemedText type='subtitle'>Fecha</ThemedText>
          <ThemedText>{moment(settingsQuery.data?.raffleDate).format("D [de] MMMM")}</ThemedText>
        </ThemedView>
      </ThemedView>
      {rifaQuery.isFetched &&
        <ThemedView style={styles.callToAction}>
          <ExternalLink href={rifaQuery.data?.website}>
            <ThemedText type="link">WebSite</ThemedText>
          </ExternalLink>
          <ExternalLink href={rifaQuery.data?.facebook}>
            <ThemedText type="link">Facebook</ThemedText>
          </ExternalLink>
        </ThemedView>
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
    justifyContent: 'space-around',
  },
  callToAction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
