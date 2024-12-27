import { StyleSheet } from 'react-native';

import { ListaSorteos } from '@/components/ListaSorteos';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function RifasScreen() {

  return (
    <ThemedSafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Rifas</ThemedText>
      </ThemedView>
      <ListaSorteos />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 15,
  },
});
