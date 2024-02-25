import { useEffect, useState } from "react";

export function useGetCustomers() {
  const [customers, setCustomers] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/customers`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ dairyId: 4 }),
        });
        let data = await res.json();
        data = await data.recordset;
        setIsLoading(false);
        setCustomers(data);
      } catch (err) {
        setIsLoading(false);
        setCustomers(undefined);
      }
    }
    fetchData();
  }, []);
  return { customers, isLoading };
}
