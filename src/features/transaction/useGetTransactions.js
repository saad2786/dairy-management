import { useEffect, useState } from "react";

export function useGetTransactions() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState(null);
  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/transactions`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ dairyId: 4 }),
          },
        );
        let data = await res.json();

        data = await data.recordset;
        setIsLoading(false);
        setTransactions(data);
      } catch (err) {
        setIsLoading(false);
        setTransactions(undefined);
      }
    }
    fetchData();
  }, []);
  return { transactions, isLoading };
}
