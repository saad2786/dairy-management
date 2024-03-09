import React from "react";
import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";

import RateRow from "./RateRow";
import { fetchRates } from "./fetchRates";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../context/useContext";

export default function CurrentRates() {
  const { dairyId } = useAuthContext();
  const {
    data: rates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rates"],
    queryFn: () => fetchRates(dairyId),
  });

  if (isLoading) return <Loader />;
  if (error || !rates) return <ErrorMessage />;
  return (
    <table className=" mx-auto table  max-h-[70vh] max-w-[60vw] overflow-scroll rounded-md border-t-2 shadow-sm shadow-slate-700">
      <thead className="text-base  font-semibold shadow-sm shadow-slate-300">
        <tr className="border-b border-slate-500 bg-slate-200">
          <th>Cattle Type</th>
          <th>Fat</th>
          <th>Price/Ltr.</th>
          <th>Start Date</th>
        </tr>
      </thead>
      <tbody>
        {rates?.length ? (
          rates?.map((rate) => {
            return (
              <RateRow
                key={rate.RATE_ID}
                fat={rate.FAT}
                rate={rate["PRICE/LTR"]}
                cattle={rate.CATTLE_TYPE}
                startDate={rate.DATE_CURRENT}
              />
            );
          })
        ) : (
          <tr className="px-8 py-10 text-center">
            There is no any rate, add rate👇
          </tr>
        )}
      </tbody>
    </table>
  );
}
