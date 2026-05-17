export async function apiRequest<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  try {
    const response = await fetch(url, options);

    const responeseJson = await response.json();

    if (!response.ok || responeseJson?.error) {
      throw {
        message:
          responeseJson?.message ||
          responeseJson?.error ||
          'Something went wrong',
        status: response.status,
      };
    }

    return responeseJson;
  } catch (error) {
    throw error;
  }
}
