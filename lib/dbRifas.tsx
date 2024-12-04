export type Rifa = {
  id: string;
  nombre: string;
  logo: string;
  website?: string; // Opcional
  facebook?: string; // Opcional
  api: string;
  sitio: "lottodigital";
};

/**
 * Retorna una promesa con los datos de todas las rifas.
 * @returns {Promise<readonly Rifa[]>} Promesa con la lista de rifas.
 */
export const fetchRifas = async (): Promise<readonly Rifa[]> => {
  return rifas;
};

/**
 * Retorna una promesa con la rifa que corresponde al ID proporcionado.
 * @param id {string} El ID de la rifa.
 * @returns {Promise<Rifa | undefined>} Promesa con la rifa encontrada o `undefined` si no existe.
 */
export const fetchRifasById = async (id: string): Promise<Rifa | undefined> => {
  return rifas.find((rifa) => rifa.id === id);
};

const rifas: readonly Rifa[] = [
  {
    id: "1",
    nombre: "El Chato",
    logo: "https://www.elchato.com.mx/logo512.png",
    website: "https://www.elchato.com.mx/",
    facebook: "https://www.facebook.com/SorteosElChato",
    api: "https://1tq72u3mta.execute-api.us-east-2.amazonaws.com/prod",
    sitio: "lottodigital"
  },
  {
    id: "2",
    nombre: "El Morro",
    logo: "https://www.rifaelmorro.com/logo512.png",
    website: "https://www.rifaelmorro.com/",
    facebook: "https://www.facebook.com/people/Rifas-El-Morro-San-Luis-Rio-Colorado/100070970370739/",
    api: "https://spql0w3uka.execute-api.us-east-2.amazonaws.com/prod",
    sitio: "lottodigital"
  },
  {
    id: "3",
    nombre: "S. Sorteos Mexicali",
    logo: "https://www.supersorteosdemexicali.com/logo512.png",
    website: "https://www.supersorteosdemexicali.com/",
    facebook: "https://www.facebook.com/people/S%C3%BAper-sorteos-Mexicali/61568765664402/",
    api: "https://lcqj9ixmid.execute-api.us-west-1.amazonaws.com/prod",
    sitio: "lottodigital"
  },
  {
    id: "4",
    nombre: "Sorteos El Morro",
    logo: "https://www.sorteoselmorro.com/logo512.png",
    website: "https://www.sorteoselmorro.com/",
    facebook: "https://www.facebook.com/people/Sorteos-Econ%C3%B3micos-El-Morro/100093527003504/",
    api: "https://tje3nv51v6.execute-api.us-east-1.amazonaws.com/prod",
    sitio: "lottodigital"
  },
  {
    id: "5",
    nombre: "El Vaquero",
    logo: "https://www.elvaquerodesonora.com/logo512.png",
    website: "https://www.elvaquerodesonora.com/",
    facebook: "https://www.facebook.com/ELVAQUEROHILLOSONORA",
    api: "https://t1bglqe3ob.execute-api.us-east-2.amazonaws.com/prod",
    sitio: "lottodigital"
  },
  {
    id: "6",
    nombre: "El Cachanilla",
    logo: "https://www.sorteoscachanilla.com/logo512.png",
    website: "https://www.sorteoscachanilla.com/",
    facebook: "https://www.facebook.com/profile.php?id=SorteosElCachanilla",
    api: "https://kwgab2nlnk.execute-api.us-east-2.amazonaws.com/prod",
    sitio: "lottodigital"
  },
  {
    id: "7",
    nombre: "Rifas E. Amigos GDL",
    logo: "https://www.rfsgdl.com/logo512.png",
    website: "https://www.rfsgdl.com/",
    facebook: "https://www.facebook.com/RifasEntreAmigosGuadalajara",
    api: "https://u7a6qx39ub.execute-api.us-east-2.amazonaws.com/prod",
    sitio: "lottodigital"
  },
  {
    id: "8",
    nombre: "Rifas La Trocka",
    logo: "https://www.rifaslatrocka.com/logo512.png",
    website: "https://www.rifaslatrocka.com/",
    facebook: "https://www.facebook.com/profile.php?id=100057495937611",
    api: "https://oynsmqzxd0.execute-api.us-east-2.amazonaws.com/prod",
    sitio: "lottodigital"
  },
  {
    id: "9",
    nombre: "Salazar",
    logo: "https://www.sorteossalazar.com/logo512.png",
    website: "https://www.sorteossalazar.com/",
    facebook: "https://www.facebook.com/profile.php?id=100080937746371",
    api: "https://ib292rnvjf.execute-api.us-east-2.amazonaws.com/prod",
    sitio: "lottodigital"
  },
]
