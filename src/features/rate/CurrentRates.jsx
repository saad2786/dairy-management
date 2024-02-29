import React from "react";
import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";
import Table from "../../ui/Table";
import TableHead from "../../ui/TableHead";
import RateRow from "./RateRow";
import { useGetRates } from "./useGetRates";
import { useQuery } from "@tanstack/react-query";

export default function CurrentRates() {
  const {
    data: rates = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rates"],
    queryFn: useGetRates,
  });
  console.log(rates);
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
        {rates?.map((rate) => {
          return (
            <RateRow
              key={rate.RATE_ID}
              fat={rate.FAT}
              rate={rate["PRICE/LTR"]}
              cattle={rate.CATTLE_TYPE}
              startDate={rate.DATE_CURRENT}
            />
          );
        })}
      </ul>
    </Table>
  );
}
