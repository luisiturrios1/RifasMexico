import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProgressBar } from '@/components/ui/ProgressBar';

type NumberItem = {
  number: string;
  selectedNumber: boolean;
};

type ApiResponse = {
  statusCode: number;
  body: NumberItem[];
};

interface EmisionProps {
  api: string;
  rifaId: string;
  sorteoId: string;
}

export function Emision({
  api,
  rifaId,
  sorteoId,
}: EmisionProps) {

  const { isLoading, isError, data } = useQuery<ApiResponse>({
    queryKey: ['rifa', 'numbers', rifaId, sorteoId],
    queryFn: async () => {
      const response = await fetch(`${api}/numbers?collection=S${sorteoId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
  });

  if (isLoading || !data?.body) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <ThemedText>Error</ThemedText>;
  }

  const totalItems = data.body.length;
  const selectedItems = data.body.filter((item) => item.selectedNumber).length;
  const progress = (selectedItems / totalItems) * 100;

  const formatNumber = (num: number) => new Intl.NumberFormat('es-MX').format(num);

  return (
    <>
      <ProgressBar progress={progress}></ProgressBar>
      <ThemedView style={styles.textContainer}>
        <ThemedView>
          <ThemedText type='defaultSemiBold'>Vendidos: </ThemedText>
          <ThemedText>{formatNumber(selectedItems)}</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText type='defaultSemiBold' style={{ textAlign: "right" }}>Emitidos: </ThemedText>
          <ThemedText style={{ textAlign: "right" }}>{formatNumber(totalItems)}</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
