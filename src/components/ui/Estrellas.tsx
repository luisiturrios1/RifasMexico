import Icon from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { StyleSheet } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { formatNumber } from '@/lib/formatNumber'

interface EstrellasProps {
  rating: number | undefined
  reviews: number | undefined
}

export const Estrellas = function ({
  rating = 0,
  reviews = 0
}: EstrellasProps) {
  const totalStars = 5
  const fullStars = Math.floor(rating)
  const halfStar = rating - fullStars >= 0.5
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0)

  return (
    <ThemedView style={styles.container}>
      {/* Renderizado de estrellas llenas */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Icon
          key={`full-${index}`}
          name="star"
          size={20}
          color="#fdd835"
        />
      ))}
      {/* Renderizado de media estrella */}
      {halfStar && (
        <Icon
          name="star-half"
          size={20}
          color="#fdd835"
        />
      )}
      {/* Renderizado de estrellas vacías */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Icon
          key={`empty-${index}`}
          name="star-border"
          size={20}
          color="#fdd835"
        />
      ))}
      <ThemedText style={styles.reviewText}>
        ({formatNumber(reviews)})
      </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reviewText: {
    marginLeft: 4
  }
})
