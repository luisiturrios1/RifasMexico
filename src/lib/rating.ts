import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'

export type Rating = {
  rifaId: string
  userId: string
  rating: number
  fecha: FirebaseFirestoreTypes.Timestamp
}

type Props = {
  rifaId: string | undefined
  userId: string | undefined
  rating: number
}

/**
 *
 * @param rifaId {string}
 * @param userId {string}
 *
 * @returns {Promise<Rating|null>}.
 */
export const getRating = async ({
  rifaId,
  userId
}: Omit<Props, 'rating'>): Promise<Rating | null> => {
  const ratingDoc = await firestore()
    .collection('rifas')
    .doc(rifaId)
    .collection('ratings')
    .doc(userId)
    .get()
  return ratingDoc.exists ? (ratingDoc.data() as Rating) : null
}

/**
 *
 * @param rifaId {string}
 * @param userId {string}
 * @param rating {number}
 *
 * @returns {Promise<Rating>}.
 */
export const saveRating = async ({
  rifaId,
  userId,
  rating
}: Props): Promise<Rating> => {
  const rifaDoc = await firestore().collection('rifas').doc(rifaId).get()

  const ratingDocRef = rifaDoc.ref.collection('ratings').doc(userId)

  await ratingDocRef.set({
    rifaId,
    userId,
    rating,
    fecha: firestore.Timestamp.now()
  })

  const ratingDoc = await ratingDocRef.get()

  return ratingDoc.data() as Rating
}
