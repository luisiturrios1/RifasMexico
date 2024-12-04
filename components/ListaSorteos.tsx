import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet } from 'react-native';

import { ListaSorteosItem } from '@/components/ListaSorteosItem';
import { fetchRifas } from '@/lib/dbRifas';
import { useCallback, useState } from 'react';


export function ListaSorteos() {
  const queryClient = useQueryClient();
  const [isRefreshing, setRefreshing] = useState(false);

  const { data } = useQuery({
    queryKey: ['rifa'],
    queryFn: fetchRifas
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['rifa'] });
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
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
