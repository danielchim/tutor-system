const fetcher = async (url: string, token: string) => {
  console.log(url[1])
  const res = await fetch(url[0], {
    headers: {
      Authorization: `Bearer ${url[1]}`
    }
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  const data = await res.json();
  return data;
};
