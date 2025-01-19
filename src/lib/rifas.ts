import firestore from '@react-native-firebase/firestore'

import { Rifa } from '@/lib/rifa'

/**
 * Obtiene la lista de rifas desde Firestore.
 *
 * @returns {Promise<Rifa[]>} Lista de rifas.
 */
export const fetchRifas = async (): Promise<Rifa[]> => {
  const querySnapshot = await firestore()
    .collection('rifas')
    .where('raffleDate', '>=', new Date())
    .orderBy('raffleDate', 'asc')
    .orderBy('rating', 'desc')
    .get()

  const rifas: Rifa[] = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data()
      }) as Rifa
  )

  return rifas
}
