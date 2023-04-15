const fetcher = async (url: string, token: string) => {
  const res = await fetch(url, {

  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  const data = await res.json();
  return data;
};

export default fetcher;
