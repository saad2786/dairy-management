import { useEffect, useState } from "react";

export function useGetRates() {
  const [isLoading, setIsLoading] = useState(true);
  const [rates, setRates] = useState(null);
  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/rates`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            dairyId: 4,
          }),
        });
        let data = await res.json();

        data = await data.recordset;
        setIsLoading(false);
        setRates(data);
      } catch (err) {
        setIsLoading(false);
        setRates(undefined);
      }
    }
    fetchData();
  }, []);
  return { rates, isLoading };
}
