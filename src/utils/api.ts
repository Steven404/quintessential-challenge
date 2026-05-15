export async function apiRequest<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();

      throw {
        message: errorData.message || 'Something went wrong',
        status: response.status,
        ...errorData,
      };
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
