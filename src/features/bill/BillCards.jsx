import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function BillCards({ bills }) {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries(["bills"]);
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
        },
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  const isCreating = status === "pending";
  return (
    <>
      {bills?.map((bill) => {
        return (
          <div
            key={bill.BILL_ID}
            className="mx-auto my-4 flex w-[40vw] flex-col gap-5 rounded-lg border-2 border-stone-500  bg-stone-100 px-10 py-8"
          >
            <div className="flex justify-between">
              <p className="text-2xl ">Customer ID:{bill.CUSTOMER_ID}</p>
              <p className="text-3xl font-bold">
                {Math.floor(bill.PRICE)} Rupee
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg">
                From {bill.FROM_DATE.slice(0, 10)} to{" "}
                {bill.TO_DATE.slice(0, 10)}
              </p>
              <p className="italic">{bill.QTY} Liters</p>
            </div>
            <div className="flex justify-between">
              <p>{bill.STATUS ? "" : "Pending"}</p>
              <button
                onClick={mutate}
                className="w-20 cursor-pointer rounded-lg border-green-600 bg-blue-500 px-2 py-2  text-center text-lg font-semibold uppercase text-white disabled:cursor-default disabled:border-2 disabled:bg-white disabled:bg-opacity-40 disabled:text-green-600"
                disabled={bill.STATUS}
              >
                {bill.STATUS ? (
                  <p className="flex items-center gap-2">
                    <IoMdCheckmarkCircleOutline /> Paid
                  </p>
                ) : (
                  "Pay"
                )}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
