import { useMutation } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Card from "./Card";

export default function BillCards({ bills }) {
  const { mutate: payBill } = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      toast.success("Successfully changed status");
    },
    onError: () => {
      toast.error("Status has not changed");
    },
  });
  async function handleUpdate() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/bills/${bills[0].BILL_ID}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        },
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      {bills?.map((bill) => {
        return <Card key={bill.BILL_ID} bill={bill} payBill={payBill} />;
      })}
    </div>
  );
}
