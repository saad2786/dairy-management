export async function useGetTransactions() {
  let data;
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/transactions`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ dairyId: 4 }),
    });
    data = await res.json();

    data = await data.recordset;
  } catch (err) {}
  return data;
}
