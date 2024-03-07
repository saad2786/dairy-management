import { useAuthContext } from "../../context/useAuthContext";

export async function fetchTransactions(dairyId) {
  let data;

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/transactions`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ dairyId }),
    });
    data = await res.json();
    console.log(data);
    data = await data.recordset;
  } catch (err) {}
  return data;
}
