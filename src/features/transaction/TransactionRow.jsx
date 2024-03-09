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
    <tr>
      <td>{id}</td>
      <td>{customer}</td>
      <td>{fat}</td>
      <td>{cattle ? "Cow" : "Buffelo"}</td>
      <td>{qty}</td>
      <td>{Math.floor(price)}</td>
    </tr>
  );
}
