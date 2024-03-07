import React from "react";
import Loader from "../../ui/Loader";
import CustomerRow from "./CustomerRow";

import { fetchCustomers } from "./fetchCustomers";
import TableHead from "../../ui/TableHead";
import Table from "../../ui/Table";
import ShowButton from "../../ui/ShowButton";
import ErrorMessage from "../../ui/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../context/useAuthContext";

export default function Customers() {
  // const customer = useGetCustomers();
  // console.log(customer);
  const { dairyId } = useAuthContext();
  const {
    data: customers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () => fetchCustomers(dairyId),
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <>
      <Table>
        <TableHead>
          <div className="w-[80px] text-center">ID</div>
          <div className="w-[220px] text-center">Name</div>
          <div className="w-[120px] text-center">Dairy</div>
          <div className="w-fit text-center">Cattle Type</div>
          <div className="w-[200px] text-center">Phone</div>
          <div className="w-[80px] text-center">Status</div>
        </TableHead>
        {customers.length ? (
          <ul>
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
          </ul>
        ) : (
          <p className="px-8 py-10 text-center">
            There is no any customer, add new customer 👇
          </p>
        )}
      </Table>

      <ShowButton>Add new Customer</ShowButton>
    </>
  );
}
