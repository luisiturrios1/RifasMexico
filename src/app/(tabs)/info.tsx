import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { TabParallaxScrollView } from '@/components/TabParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function InfoScreen() {
  return (
    <TabParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="info.bubble.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Rifas Mexico</ThemedText>
      </ThemedView>
      <ThemedText>
        Rifas México es la app ideal para seguir de cerca los sorteos más emocionantes de México. Mantente al día con los eventos, consulta los detalles de cada rifa, lleva un registro de tus participaciones y comparte tu experiencia dejando reseñas de los sorteos. ¡No te pierdas la oportunidad de ganar y ayudar a otros con tus opiniones!
      </ThemedText>
      <Collapsible title="Quienes somos">
        <ThemedText>
          Somos un equipo de desarrolladores independientes comprometidos con brindar herramientas útiles y transparentes para los usuarios.
        </ThemedText>
        <ThemedText>
          En esta aplicación, puedes realizar el seguimiento de rifas organizadas por terceros.
        </ThemedText>
        <ThemedText>
          Es importante destacar que no vendemos boletos ni asumimos responsabilidad sobre ninguna rifa.
        </ThemedText>
        <ThemedText>
          Nuestra misión es empoderar a los consumidores, proporcionando herramientas que les permitan evaluar la legalidad y confiabilidad de cada organizador de rifas. ¡Gracias por confiar en nosotros!
        </ThemedText>
      </Collapsible>
      <Collapsible title="Registrar tu rifa en Rifas México">
        <ThemedText>
          ¿Quieres que tu rifa aparezca en Rifas México? Es muy fácil. Solo envía un correo electrónico con la información completa de tu rifa:
        </ThemedText>
        <Link href="mailto:m7yh56bzps@privaterelay.appleid.com">
          <ThemedText type="link">Correo Electronico</ThemedText>
        </Link>
      </Collapsible>
      <Collapsible title="Reportar un error">
        <ThemedText>
          Si encuentras algún error en la aplicación, por favor repórtalo enviando un correo electrónico a la dirección indicada. Recuerda adjuntar una captura de pantalla y el modelo de tu teléfono para facilitar el seguimiento. ¡Gracias por tu ayuda!
        </ThemedText>
        <Link href="mailto:m7yh56bzps@privaterelay.appleid.com">
          <ThemedText type="link">Correo Electronico</ThemedText>
        </Link>
      </Collapsible>
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
