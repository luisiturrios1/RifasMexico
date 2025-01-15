import { useQuery } from '@tanstack/react-query'
import { Link, useLocalSearchParams, useNavigation } from 'expo-router'
import React from 'react'
import { Image, StyleSheet } from 'react-native'

import { Emision } from '@/components/Emision'
import { ParallaxScrollView } from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { BoxButtonLink } from '@/components/ui/BoxButtonLink'
import { Estrellas } from '@/components/ui/Estrellas'
import { Fecha } from '@/components/ui/Fecha'
import { fetchRifa } from '@/lib/rifa'

type Params = {
  rifaId: string
}

export default function RifaScreen() {
  const { rifaId } = useLocalSearchParams<Params>()
  const navigation = useNavigation()

  const rifaQuery = useQuery({
    queryKey: ['rifas', rifaId],
    queryFn: async () => fetchRifa(rifaId)
  })

  const api = rifaQuery.data?.api

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: rifaQuery.data?.nombre })
  }, [navigation, rifaQuery.data?.nombre])

  const utm = '?utm_source=rifasmexico&utm_medium=app&utm_campaign=organic'

  const links = [
    {
      icon: 'logo-facebook',
      text: 'Facebook',
      url: `${rifaQuery.data?.facebook}${utm}`
    },
    {
      icon: 'checkmark-circle',
      text: 'Verificar',
      url: `${rifaQuery.data?.website}s${rifaQuery.data?.sorteoId}-verificador${utm}`
    },
    {
      icon: 'dice',
      text: 'Jugar',
      url: `${rifaQuery.data?.website}s${rifaQuery.data?.sorteoId}-lista${utm}`
    },
    {
      icon: 'cash',
      text: 'Pagos',
      url: `${rifaQuery.data?.website}pagos${utm}`
    }
  ]

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={{ uri: rifaQuery.data?.imageUrl }}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Image
          source={{ uri: rifaQuery.data?.logo }}
          style={styles.avatar}
        />
        <ThemedView>
          <ThemedText type="subtitle">{rifaQuery.data?.nombre}</ThemedText>
          <Link
            href={{
              pathname: '/rifa/modal',
              params: { rifaId, nombreRifa: rifaQuery.data?.nombre }
            }}
          >
            <Estrellas
              rating={rifaQuery.data?.rating}
              reviews={rifaQuery.data?.reviews}
            />
          </Link>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.containerBoxes}>
        {links.map((item, index) => (
          <BoxButtonLink
            key={index}
            iconName={item.icon}
            href={item.url}
          >
            {item.text}
          </BoxButtonLink>
        ))}
      </ThemedView>
      <ThemedView style={styles.detailsContainer}>
        <ThemedView>
          <ThemedText type="defaultSemiBold">Sorteo</ThemedText>
          <ThemedText>S{rifaQuery.data?.sorteoId}</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText
            type="defaultSemiBold"
            style={{ textAlign: 'right' }}
          >
            Fecha
          </ThemedText>
          <Fecha
            fecha={rifaQuery.data?.raffleDate?.toDate()}
            style={{ textAlign: 'right' }}
          />
        </ThemedView>
      </ThemedView>
      {rifaQuery.isSuccess && (
        <Emision
          api={api}
          rifaId={rifaId}
          sorteoId={rifaQuery.data?.sorteoId}
        />
      )}
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    height: 250,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 15
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerBoxes: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  text: {
    fontSize: 16,
    marginTop: 8
  }
})
