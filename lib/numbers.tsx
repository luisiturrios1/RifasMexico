export type NumbersResponse = {
  "statusCode": string;
  "body": {
    number: string;
    selectedNumber: string;
  }[];
};

/**
 * 
 * @param api {string} api endpoint de la rifa.
 * @param sorteoId {string} sorteoId.
 * @returns {Promise<NumbersResponse>} 
 */
export const fetchNumbers = async (api: string | undefined, sorteoId: string | undefined): Promise<NumbersResponse> => {
  const response = await fetch(
    `${api}/numbers?collection=S${sorteoId}`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return await response.json();
};
