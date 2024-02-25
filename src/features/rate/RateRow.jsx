import React from "react";

export default function RateRow({ fat, rate, cattle, startDate }) {
  return (
    <li className="flex items-center justify-between gap-[10px] border-b border-stone-300 bg-stone-50 p-2 px-4 text-sm sm:text-xl ">
      <div className="w-[100px] text-center">{cattle ? "Cow" : "Buffelo"}</div>
      <div className="w-[100px] text-center">{fat}</div>
      <div className="w-[100px] text-center">{rate}</div>
      <div className="w-[250px] text-center">{startDate.slice(0, 10)}</div>
    </li>
  );
}
