import {
  useQuery
} from '@tanstack/react-query';
import { router } from "expo-router";
import moment from 'moment';
import 'moment/locale/es';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from "@/constants/Colors";
import { useColorScheme } from '@/hooks/useColorScheme';
import { fetchCover } from '@/lib/cover';
import { Rifa } from '@/lib/rifa';
import { fetchSettings } from '@/lib/setting';


export function ListaSorteosItem({ item }: { item: Rifa }) {

  const colorScheme = useColorScheme();

  const coverQuery = useQuery({
    queryKey: ['rifa', 'cover', item.id],
    queryFn: async () => fetchCover(item.api),
  });

  const sorteoId = coverQuery.data?.link;

  const settingsQuery = useQuery({
    queryKey: ['rifa', 'settings', item.id, sorteoId],
    queryFn: async () => fetchSettings(item.api, sorteoId),
    enabled: !!sorteoId
  });

  const onPress = () => {
    router.push({ pathname: "/rifa", params: { rifaId: item.id } });
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={styles.item}>
        <Image source={{ uri: item.logo }} style={styles.avatar} />
        <ThemedView style={styles.content}>
          <ThemedView style={styles.header}>
            <ThemedText style={styles.name}>{item.nombre}</ThemedText>
          </ThemedView>
          {coverQuery.isFetched &&
            <>
              <ThemedText type="defaultSemiBold">{"S" + sorteoId}</ThemedText>
              {settingsQuery.isFetched && <ThemedText>{moment(settingsQuery.data?.raffleDate).format("D [de] MMMM")}</ThemedText>}
            </>
          }
        </ThemedView>
        <ThemedView>
          {coverQuery.isFetched && <Image source={{ uri: coverQuery.data?.imageUrl }} style={styles.cover} />}
        </ThemedView>
        <ThemedView style={styles.deatilIcon}>
          <IconSymbol size={15} name="chevron.right" color={Colors[colorScheme ?? 'light'].icon} />
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 15,
  },
  cover: {
    width: 120,
    height: 80,
    borderRadius: 5,
    marginRight: 25,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  deatilIcon: {
    position: 'absolute',
    right: 10,
    top: 45,
  },
});
