import React, { useContext, useEffect } from "react";
import Loader from "../../ui/Loader";
import CustomerRow from "./CustomerRow";

import { fetchCustomers } from "./fetchCustomers";

import ShowButton from "../../ui/ShowButton";
import ErrorMessage from "../../ui/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { Context, DispatchContext } from "../../context/useContext";

export default function Customers() {
  const dispatch = useContext(DispatchContext);
  const { dairyId } = useContext(Context);

  //React Query for fetching data
  const {
    data: customers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () => fetchCustomers(dairyId),
  });

  //Calcaulte customer details
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

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <>
      <table className=" table max-h-[70vh] w-full overflow-scroll rounded-md border-t-2 shadow-sm shadow-slate-700">
        <thead className="text-base  font-semibold shadow-sm shadow-slate-300">
          <tr className="border-b border-slate-500 bg-slate-200">
            <th>ID</th>
            <th>Name</th>
            <th>Dairy</th>
            <th>Cattle Type</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        {customers.length ? (
          <tbody>
            {customers?.map((customer) => {
              return (
                <CustomerRow
                  key={customer.CUSTOMER_ID}
                  id={customer.CUSTOMER_ID}
                  name={customer.CUSTOMER_NAME}
                  dairy={customer.DAIRY_ID}
                  cattle={customer.CATTLE_TYPE}
                  phone={customer.PHONE_NO}
                  status={customer.STATUS}
                />
              );
            })}
          </tbody>
        ) : (
          <p className="px-8 py-10 text-center">
            There is no any customer, add new customer 👇
          </p>
        )}
      </table>

      <ShowButton>+ Add Customer</ShowButton>
    </>
  );
}
