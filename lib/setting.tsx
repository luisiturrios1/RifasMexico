export type Setting = {
  "timeReserved": string;
  "showSelected": boolean;
  "rec1": string;
  "rec2": string;
  "extraText": string;
  "extraMessage": string;
  "raffleDate": string;
  "accounts": string[];
};

/**
 * 
 * @param api {string} api endpoint de la rifa.
 * @param sorteoId {string} sorteoId.
 * @returns {Promise<Setting>} 
 */
export const fetchSettings = async (api: string | undefined, sorteoId: string | undefined): Promise<Setting> => {
  const response = await fetch(
    api + `/settings?raffle=S${sorteoId}Settings`
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return await response.json();
};
