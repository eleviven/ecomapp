export default async function useFetchAsync(
  input: RequestInfo | URL,
  options?: RequestInit
) {
  try {
    const data = await fetch(input, options).then((res) => res.json());
    return data;
  } catch (error) {
    throw error;
  }
}
