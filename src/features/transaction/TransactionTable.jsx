import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";
import Table from "../../ui/Table";
import TableHead from "../../ui/TableHead";

import TransactionRow from "./TransactionRow";
import { useGetTransactions } from "./useGetTransactions";

export default function TransactionTable() {
  const { transactions, isLoading } = useGetTransactions();
  const navigate = useNavigate();
  if (isLoading) return <Loader />;
  if (!transactions) return <ErrorMessage />;
  return (
    <>
      <Table>
        <TableHead>
          <div className="w-[80px] text-center">ID</div>
          <div className="w-[220px] text-center">Customer</div>
          <div className="w-[120px] text-center">Fat</div>
          <div className="w-fit text-center">Cattle Type</div>
          <div className="w-[100px] text-center">Quantity</div>
          <div className="w-[150px] text-center">Price</div>
        </TableHead>

        <ul>
          {transactions.map((transaction) => {
            return (
              <TransactionRow
                key={transaction.ID}
                id={transaction.ID}
                customer={transaction.CUSTOMER_ID}
                fat={transaction.FAT}
                qty={transaction.QTY}
                cattle={transaction.CATTLE_TYPE}
                price={transaction.PRICE}
              />
            );
          })}
        </ul>
      </Table>
      <button
        className=" mt-2 w-[80vw]  rounded-xl bg-green-600 px-3 py-2 font-sans text-sm uppercase text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-opacity-65  sm:w-[70vw] sm:text-xl"
        onClick={() => navigate("new")}
      >
        New Transaction
      </button>
    </>
  );
}
