import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatNumber } from '@/lib/formatNumber';
import { ApiResponse, fetchNumbers } from '@/lib/numbers';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  api: string;
  rifaId: string;
  sorteoId: string;
}

export function Emision({ api, rifaId, sorteoId }: Props) {

  const { isLoading, data, isError, error } = useQuery<ApiResponse>({
    queryKey: ['rifas', rifaId, 'numbers', sorteoId],
    queryFn: () => fetchNumbers(api, sorteoId),
  });

  if (isLoading) {
    return (
      <ThemedView>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView>
        <ThemedText>Error: {error.message}</ThemedText>
      </ThemedView>
    );
  }

  const totalItems = data?.body.length ?? 0;
  const selectedItems = data?.body.filter((item) => item.selectedNumber).length ?? 0;
  const progress = totalItems > 0 ? (selectedItems / totalItems) * 100 : 0;

  return (
    <>
      <ThemedView style={styles.textContainer}>
        <ThemedView>
          <ThemedText type="defaultSemiBold">Vendidos: </ThemedText>
          <ThemedText>{formatNumber(selectedItems)}</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText type='defaultSemiBold' style={{ textAlign: "right" }}>Emitidos: </ThemedText>
          <ThemedText style={{ textAlign: "right" }}>{formatNumber(totalItems)}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ProgressBar progress={progress}></ProgressBar>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
