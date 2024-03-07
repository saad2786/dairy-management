import React from "react";
import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";
import Table from "../../ui/Table";
import TableHead from "../../ui/TableHead";
import RateRow from "./RateRow";
import { fetchRates } from "./fetchRates";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../context/useAuthContext";

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
    <Table>
      <TableHead>
        <div className="w-[100px] text-center">Cattle Type</div>
        <div className="w-[100px] text-center">Fat</div>
        <div className="w-[100px] text-center">Price/Ltr.</div>
        <div className="w-[250px] text-center">Start Date</div>
      </TableHead>
      <ul>
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
          <p className="px-8 py-10 text-center">
            There is no any rate, add rate👇
          </p>
        )}
      </ul>
    </Table>
  );
}
