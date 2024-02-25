import React from "react";
import TableRow from "../../ui/TableRow";

export default function TransactionRow({
  id,
  customer,
  fat,
  qty,
  cattle,
  price,
}) {
  return (
    <TableRow>
      <div className="w-[80px] text-center">{id}</div>
      <div className="w-[250px] text-center">{customer}</div>
      <div className="w-[120px] text-center">{fat}</div>
      <div className="w-[150px] text-center">{cattle ? "Cow" : "Buffelo"}</div>
      <div className="w-[100px] text-center">{qty}</div>
      <div className="w-[150px] text-center">{Math.floor(price)}</div>
    </TableRow>
  );
}
