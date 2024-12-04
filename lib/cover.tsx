export type Cover = {
  _id: string;
  link: string;
  imageUrl: string;
  __v: number
};

/**
 *  
 * @param api {string} api endpoint de la rifa.
 * @returns {Promise<Cover>} 
 */
export const fetchCover = async (api: string | undefined): Promise<Cover> => {
  const response = await fetch(
    api + '/cover',
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()

  return data[0];
};
