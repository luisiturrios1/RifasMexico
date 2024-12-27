import { ListaSorteosItem } from '@/components/ListaSorteosItem';
import { fetchRifas } from '@/lib/rifas';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';


export function ListaSorteos() {
  const [isRefreshing, setRefreshing] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['rifas'],
    queryFn: fetchRifas
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

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
