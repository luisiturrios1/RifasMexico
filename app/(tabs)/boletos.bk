import { StyleSheet } from 'react-native';

import { TabParallaxScrollView } from '@/components/TabParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function BoletosScreen() {
  return (
    <TabParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="rectangle.fill.on.rectangle.angled.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Boletos</ThemedText>
      </ThemedView>
      <ThemedText>Próximamente, podrás visualizar aquí los boletos que hayas adquirido en las distintas rifas..</ThemedText>
    </TabParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
