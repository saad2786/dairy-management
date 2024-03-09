import React from "react";

export default function RateRow({ fat, rate, cattle, startDate }) {
  return (
    <tr>
      <td>{cattle ? "Cow" : "Buffelo"}</td>
      <td>{fat}</td>
      <td>{rate}</td>
      <td>{startDate.slice(0, 10)}</td>
    </tr>
  );
}
