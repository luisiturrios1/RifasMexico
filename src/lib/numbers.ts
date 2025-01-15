type NumberItem = {
  number: string
  selectedNumber: boolean
}

export type ApiResponse = {
  statusCode: number
  body: NumberItem[]
}

/**
 *
 * @param api {string} api endpoint de la rifa.
 * @param sorteoId {string} sorteoId.
 * @returns {Promise<NumbersResponse>}
 */
export const fetchNumbers = async (
  api: string | undefined,
  sorteoId: string | undefined
): Promise<ApiResponse> => {
  const response = await fetch(`${api}/numbers?collection=S${sorteoId}`)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data: ApiResponse = await response.json()

  if (data.statusCode !== 200) {
    throw new Error('Error fetching numbers')
  }

  return data
}
