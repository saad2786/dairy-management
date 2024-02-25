import React from "react";
import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";
import Table from "../../ui/Table";
import TableHead from "../../ui/TableHead";
import RateRow from "./RateRow";
import { useGetRates } from "./useGetRates";

export default function CurrentRates() {
  const { rates, isLoading } = useGetRates();
  if (isLoading) return <Loader />;
  if (!rates) return <ErrorMessage />;
  if (!rates.length) return;
  return (
    <Table>
      <TableHead>
        <div className="w-[100px] text-center">Cattle Type</div>
        <div className="w-[100px] text-center">Fat</div>
        <div className="w-[100px] text-center">Price/Ltr.</div>
        <div className="w-[250px] text-center">Start Date</div>
      </TableHead>
      <ul>
        {rates.map((transaction) => {
          return (
            <RateRow
              key={transaction.RATE_ID}
              fat={transaction.FAT}
              rate={transaction.RATE}
              cattle={transaction.CATTLE_TYPE}
              startDate={transaction.DATE_CURRENT}
            />
          );
        })}
      </ul>
    </Table>
  );
}
