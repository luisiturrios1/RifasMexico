import { Emision } from '@/components/Emision';
import { ParallaxScrollView } from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BoxButtonLink } from '@/components/ui/BoxButtonLink';
import { Estrellas } from '@/components/ui/Estrellas';
import { Fecha } from '@/components/ui/Fecha';
import { fetchRifa } from '@/lib/rifa';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import React from "react";
import { Image, StyleSheet } from 'react-native';

type Params = {
  rifaId: string;
};

export default function RifaScreen() {
  const { rifaId } = useLocalSearchParams<Params>();
  const navigation = useNavigation();

  const rifaQuery = useQuery({
    queryKey: ['rifa', rifaId],
    queryFn: async () => fetchRifa(rifaId),
  });

  const api = rifaQuery.data?.api;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: rifaQuery.data?.nombre });
  }, [navigation, rifaQuery.data]);

  const links = [
    { icon: "globe-outline", text: "Website", url: `${rifaQuery.data?.website}s${rifaQuery.data?.sorteoId}-lista` },
    { icon: "logo-facebook", text: "Facebook", url: rifaQuery.data?.facebook },
    { icon: "checkmark-circle", text: "Verificador", url: `${rifaQuery.data?.website}s${rifaQuery.data?.sorteoId}-verificador` },
    { icon: "cash", text: "Pagos", url: `${rifaQuery.data?.website}pagos` },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={{ uri: rifaQuery.data?.imageUrl }}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <Image source={{ uri: rifaQuery.data?.logo }} style={styles.avatar} />
        <ThemedView>
          <ThemedText type="subtitle">{rifaQuery.data?.nombre}</ThemedText>
          <Link
            href={{
              pathname: '/rifa/modal',
              params: { rifaId: rifaId, nombreRifa: rifaQuery.data?.nombre }
            }}
          >
            <Estrellas rating={rifaQuery.data?.rating} reviews={rifaQuery.data?.reviews} />
          </Link>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.detailsContainer}>
        <ThemedView>
          <ThemedText type='defaultSemiBold'>Sorteo</ThemedText>
          <ThemedText>S{rifaQuery.data?.sorteoId}</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText type='defaultSemiBold' style={{ textAlign: "right" }}>Fecha</ThemedText>
          <Fecha fecha={rifaQuery.data?.raffleDate.toDate()} />
        </ThemedView>
      </ThemedView>
      {
        rifaQuery.isFetched &&
        <Emision api={api} rifaId={rifaId} sorteoId={rifaQuery.data?.sorteoId} />
      }
      <ThemedView style={styles.containerBoxes}>
        {links.map((item, index) => (
          <BoxButtonLink
            key={index}
            iconName={item.icon}
            href={item.url}>
            {item.text}
          </BoxButtonLink>
        ))}
      </ThemedView>
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
  text: {
    fontSize: 16,
    marginTop: 8,
  },
});
