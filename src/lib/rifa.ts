import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'

export type Rifa = {
  id: string
  nombre: string
  logo: string
  website: string
  facebook: string
  api: string
  sitio: string
  rating: number
  reviews: number
  autoUpdate: boolean
  raffleDate: FirebaseFirestoreTypes.Timestamp
  sorteoId: number
  imageUrl: string
}

/**
 * Obtiene una rifa desde Firestore.
 * @param rifaId {string} Id de la rifa.
 *
 * @returns {Promise<Rifa>} Lista de rifas.
 */
export const fetchRifa = async (rifaId: string): Promise<Rifa> => {
  const doc = await firestore().collection('rifas').doc(rifaId).get()

  return {
    ...doc.data(),
    id: doc.id
  } as Rifa
}
