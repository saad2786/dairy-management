import React, { useState } from "react";
import BillCards from "../features/bill/BillCards";
import GenerateBill from "../features/bill/GenerateBill";

export default function Bill() {
  const [bills, setBills] = useState();

  return (
    <>
      <BillCards bills={bills} />
      <GenerateBill setBills={setBills} />
    </>
  );
}
