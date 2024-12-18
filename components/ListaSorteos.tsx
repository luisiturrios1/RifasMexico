import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ListaSorteosItem } from '@/components/ListaSorteosItem';
import { fetchRifas } from '@/lib/rifas';


export function ListaSorteos() {
  const queryClient = useQueryClient();
  const [isRefreshing, setRefreshing] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ['rifa'],
    queryFn: fetchRifas
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={(props) => <ListaSorteosItem {...props} />}
      keyExtractor={item => item.id}
      style={styles.list}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
