import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ThemedText } from '@/components/ThemedText';

type NumberItem = {
  number: string;
  selectedNumber: boolean;
};

type ApiResponse = {
  statusCode: number;
  body: NumberItem[];
};

interface ListaSorteosItemEmisionProps {
  api: string;
  rifero: string;
  sorteo: string;
}

export function ListaSorteosItemEmision({
  api,
  rifero,
  sorteo,
}: ListaSorteosItemEmisionProps) {

  const { isLoading, isError, data } = useQuery<ApiResponse>({
    queryKey: ['numbers', rifero, sorteo],
    queryFn: async () => {
      const response = await fetch(`${api}/numbers?collection=S${sorteo}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <ThemedText>...</ThemedText>;
  }

  if (isError || !data?.body) {
    return <ThemedText>Error</ThemedText>;
  }

  const totalItems = data.body.length;
  const selectedItems = data.body.filter((item) => item.selectedNumber).length;

  return (
    <ThemedText>
      {`V: ${selectedItems} E: ${totalItems}`}
    </ThemedText>
  );
}
