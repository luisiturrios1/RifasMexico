import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Estrellas } from '@/components/ui/Estrellas';
import { Fecha } from '@/components/ui/Fecha';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from "@/constants/Colors";
import { useColorScheme } from '@/hooks/useColorScheme';
import { Rifa } from '@/lib/rifa';
import { router } from "expo-router";
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';


export function ListaSorteosItem({ item }: { item: Rifa }) {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const onPress = () => {
    router.push({ pathname: "/rifa", params: { rifaId: item.id } });
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={styles.item}>
        {width > 380 && <Image source={{ uri: item.logo }} style={styles.avatar} />}
        <ThemedView style={styles.content}>
          <ThemedView style={styles.header}>
            <ThemedText style={styles.name}>{item.nombre}</ThemedText>
          </ThemedView>
          <Estrellas rating={item.rating} reviews={item.reviews} />
          <Fecha fecha={item.raffleDate?.toDate()} />
        </ThemedView>
        <ThemedView>
          <Image source={{ uri: item.imageUrl }} style={styles.cover} />
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
