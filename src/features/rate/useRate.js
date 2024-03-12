import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRates } from "./fetchRates";
import { Context, DispatchContext } from "../../context/useContext";

export function useRate() {
  const { dairyId } = useContext(Context);
  const dispatch = useContext(DispatchContext);
  const {
    data: rates,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["rates"],
    queryFn: () => fetchRates(dairyId),
  });
  useEffect(() => {
    const rateDetails = {
      buffeloMilkPrice:
        rates?.find((rate) => !rate.CATTLE_TYPE)?.["PRICE/LTR"] || 0,
      cowMilkPrice: rates?.find((rate) => rate.CATTLE_TYPE)?.["PRICE/LTR"] || 0,
    };

    dispatch({
      type: "rate",
      payload: rateDetails,
    });
  }, [rates, dispatch]);

  return { rates, isLoading, error, isFetching };
}
