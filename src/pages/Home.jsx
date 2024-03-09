import React, { useContext, useEffect } from "react";
import { Context, DispatchContext } from "../context/useContext";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "../features/customer/fetchCustomers";
import { fetchTransactions } from "../features/transaction/fetchTransactions";
import { useCalculateTransactionDetails } from "../features/transaction/transactionCalculate";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";
import { BiRupee } from "react-icons/bi";

export default function Home() {
  const state = useContext(Context);
  const dispatch = useContext(DispatchContext);
  const {
    dairyId,
    dairyName,
    totalCustomer,
    activeCustomer,
    todayTransactionsAmount,
    paidCustomer,
    unpaidCustomer,
    todayTransactionQty,
    lastMonthBuffeloMilkQty,
    lastMonthCowMilkQty,
    highestFatBuffelo,
    highestFatCow,
    lowestFatBuffelo,
    lowestFatCow,
  } = state;
  //Customer Data
  const {
    data: customers,
    isFetching: isFetchingCustomers,
    error: customerError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () => fetchCustomers(dairyId),
  });
  //Transactions Data
  const {
    data: transactions,
    isFetching: isFetchingTransactions,
    error: transactionsError,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(dairyId),
  });
  useEffect(() => {
    const customerDetails = {
      totalCustomer: customers?.length,
      activeCustomer: customers?.filter(
        (customer) => customer?.STATUS && customer,
      ).length,
    };
    dispatch({
      type: "customer",
      payload: customerDetails,
    });
  }, [customers, dispatch]);
  const isFetching = isFetchingCustomers || isFetchingTransactions;
  const inactiveCustomer = totalCustomer - activeCustomer;
  useCalculateTransactionDetails({ transactions });
  if (isFetching) return <Loader />;
  if (transactionsError || customerError) return <ErrorMessage />;
  return (
    <>
      <div className="font-outfit grid h-[84vh] grid-cols-4 grid-rows-4 gap-4">
        {/* First Row */}
        <div className="stats col-span-4 row-span-1 flex w-full items-center justify-between bg-gray-200 bg-opacity-60 bg-[url('/images/dairyFarm.jpg')] bg-cover bg-no-repeat px-4 py-1 shadow">
          <div className="stat">
            <div className="w-fit rounded-md bg-slate-400 bg-opacity-50 px-4 py-2  backdrop-blur-sm *:text-slate-100">
              <div className="stat-title">Hello, Welcome</div>
              <div className="stat-value">{dairyName}</div>
              <div className="stat-desc text-xl">ID: {dairyId}</div>
            </div>
          </div>
          <div className="stat ">
            <div className="w-fit  rounded-md bg-slate-400 bg-opacity-50 px-4 py-3 text-slate-100 backdrop-blur-sm">
              <div className="stat-value  text-2xl font-semibold">
                {new Date().toDateString()}
              </div>
            </div>
          </div>
          <div className="stat ">
            <div className="w-fit  rounded-md bg-slate-400 bg-opacity-50 px-4 py-3 backdrop-blur-sm *:text-slate-100">
              <div className="stat-title">Today's Transactions</div>
              <div className="stat-value flex items-center text-2xl font-semibold">
                <BiRupee />
                {todayTransactionsAmount}
              </div>
            </div>
          </div>
        </div>
        <div className="stats bg-gray-200 p-4 shadow">
          <div className="stat">
            <div className="stat-title">Total Customers</div>
            <div className="stat-value">{totalCustomer}</div>
          </div>
        </div>
        <div className="stats bg-green-200 p-4 shadow">
          <div className="stat">
            <div className="stat-title">Active Customers</div>
            <div className="stat-value">{activeCustomer}</div>
          </div>
        </div>
        <div className="stats bg-red-200 p-4 shadow">
          <div className="stat">
            <div className="stat-title">Inactive Customers</div>
            <div className="stat-value">{inactiveCustomer}</div>
          </div>
        </div>
        <div className="stats bg-gray-200 p-4 shadow">
          <div className="stat">
            <div className="stat-title">Total Transaction </div>
            <div className="stat-value">
              {todayTransactionQty}{" "}
              <span className="text-xl font-light italic">Ltr</span>
            </div>
          </div>
        </div>

        {/* Second Row */}

        <div className="stats col-span-3 row-span-1 bg-gray-200 p-4 shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Buffelo Milk </div>
            <div className="stat-value">
              {lastMonthBuffeloMilkQty}{" "}
              <span className="text-lg font-light italic">Ltr</span>
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Highest Fat</div>
            <div className="stat-value">{highestFatBuffelo}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Lowest Fat</div>
            <div className="stat-value text-secondary">
              {lowestFatBuffelo !== Infinity ? lowestFatBuffelo : 0}
            </div>
          </div>
        </div>
        <div className="stats stats-vertical col-span-1 row-span-2 bg-gray-200 p-4 shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Bill Paid </div>
            <div className="stat-value">{paidCustomer}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Bill Pending</div>
            <div className="stat-value">{unpaidCustomer}</div>
          </div>
        </div>
        <div className="stats col-span-3 row-span-1 bg-gray-200 p-4 shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Cow Milk </div>
            <div className="stat-value">
              {lastMonthCowMilkQty}{" "}
              <span className="text-lg font-light italic">Ltr</span>
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Highest Fat</div>
            <div className="stat-value">{highestFatCow}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Lowest Fat</div>
            <div className="stat-value text-secondary">
              {" "}
              {lowestFatCow !== Infinity ? lowestFatCow : 0}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
