import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Fecha } from '@/components/ui/Fecha';
import { getRating, Rating, saveRating } from "@/lib/rating";
import Icon from '@expo/vector-icons/MaterialIcons';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

type Params = {
  rifaId: string;
  nombreRifa: string;
};

export default function Modal() {
  const firebaseUser = auth().currentUser;
  const { rifaId, nombreRifa } = useLocalSearchParams<Params>();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [reatingVal, setReatingVal] = useState<number>(0);
  const [reating, setReating] = useState<Rating>();

  useEffect(() => {
    if (!firebaseUser) {
      auth()
        .signInAnonymously()
        .then((userCredential) => {
          setUser(userCredential.user);
        })
        .catch(error => {
          console.error(error);
        });
      return;
    }
    setUser(firebaseUser);
  }, [firebaseUser]);

  useEffect(() => {
    getRating({ rifaId, userId: user?.uid }).then((rating) => {
      if (!rating) { return }
      setReatingVal(rating?.rating || 0);
      setReating(rating);
    });
  }, [firebaseUser, user?.uid]);

  const handleStarPress = async (star: number) => {
    if (!user) {
      return;
    }
    saveRating({ rifaId, userId: user.uid, rating: star }).then((rating) => {
      setReatingVal(star);
      setReating(rating);
      alert('Gracias por tu calificación');
      setTimeout(() => {
        router.back();
      }, 1000);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable style={{ flex: 1 }} onPress={router.back} />
      <View style={[styles.content, { height: height / 3 }]}>
        <ThemedView style={styles.container}>
          <ThemedText>
            Como calificas a
            <ThemedText type="defaultSemiBold"> {nombreRifa}</ThemedText>
          </ThemedText>
          <ThemedView style={styles.estrellasContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                <Icon
                  name={star <= reatingVal ? 'star' : 'star-border'}
                  size={50}
                  style={styles.estrella}
                />
              </TouchableOpacity>
            ))}
          </ThemedView>
          {reating && (
            <ThemedText type="small">
              Calificado el {" "}
              <Fecha
                fecha={reating.fecha.toDate()}
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
    padding: 16,
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
