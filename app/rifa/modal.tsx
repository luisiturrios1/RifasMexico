import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Fecha } from '@/components/ui/Fecha';
import { getRating, Rating, saveRating } from "@/lib/rating";
import Icon from '@expo/vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

type Params = {
  rifaId: string;
  nombreRifa: string;
};

export default function Modal() {
  const { rifaId, nombreRifa } = useLocalSearchParams<Params>();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const [userId, setUserId] = useState<string>();
  const [rating, setRating] = useState<Rating>();

  useEffect(() => {
    const load = async () => {
      let currentUser = auth().currentUser;

      // Si no hay usuario, autenticar como anónimo
      if (!currentUser) {
        const userCredential = await auth().signInAnonymously();
        currentUser = userCredential.user;
        setUserId(currentUser.uid);
        return
      }

      setUserId(currentUser.uid);

      // Si el usuario existe trata de obtener la calificacion
      const rating = await getRating({ rifaId, userId: currentUser.uid });
      if (rating) {
        setRating(rating);
      }
    }

    load();
  }, []);

  const handleStarPress = async (star: number) => {
    if (!userId) {
      return;
    }
    setRating({ ...rating, rating: star });
    saveRating({ rifaId, userId: userId, rating: star }).then((rating) => {
      setTimeout(() => {
        router.back();
      }, 750);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable style={{ flex: 1 }} onPress={router.back} />
      <View style={[styles.content, { height: height / 3 }]}>
        <ThemedView style={styles.container}>
          <ThemedText>
            Califica a
            <ThemedText type="defaultSemiBold"> {nombreRifa}</ThemedText>
          </ThemedText>
          <ThemedView style={styles.estrellasContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleStarPress(star)}
              >
                <Icon
                  name={star <= (rating?.rating ?? 0) ? 'star' : 'star-border'}
                  size={50}
                  style={styles.estrella}
                />
              </TouchableOpacity>
            ))}
          </ThemedView>
          {rating?.fecha && (
            <ThemedText type="small">
              Calificado el {" "}
              <Fecha
                fecha={rating?.fecha.toDate()}
                format="dddd, D [de] MMMM [de] YYYY, HH:mm"
                style={styles.smallText}
              />
            </ThemedText>
          )}
        </ThemedView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  estrellasContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  estrella: {
    color: '#fdd835',
    marginHorizontal: 5,
  },
  smallText: {
    fontSize: 11,
    lineHeight: 24,
  },
});
