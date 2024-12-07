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
    return <ThemedText>...</ThemedText>;
  }

  if (isError) {
    return <ThemedText>Error</ThemedText>;
  }

  const totalItems = data.body.length;
  const selectedItems = data.body.filter((item) => item.selectedNumber).length;

  return (
    <ThemedText>
      <ThemedText type='defaultSemiBold'>Vendidos: </ThemedText>
      {selectedItems}
      <ThemedText type='defaultSemiBold'> Emitidos: </ThemedText>
      {totalItems}
    </ThemedText>
  );
}
