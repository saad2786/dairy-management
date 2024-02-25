import React from "react";
import Loader from "../../ui/Loader";
import CustomerRow from "./CustomerRow";

import { useGetCustomers } from "./useGetCustomers";
import TableHead from "../../ui/TableHead";
import Table from "../../ui/Table";
import ShowButton from "../../ui/ShowButton";
import ErrorMessage from "../../ui/ErrorMessage";

export default function Customers() {
  const { customers, isLoading } = useGetCustomers();

  if (isLoading) return <Loader />;
  if (!customers) return <ErrorMessage />;
  return (
    <>
      <Table>
        <TableHead>
          <div className="w-[80px] text-center">ID</div>
          <div className="w-[220px] text-center">Name</div>
          <div className="w-[120px] text-center">Dairy</div>
          <div className="w-fit text-center">Cattle Type</div>
          <div className="w-[200px] text-center">Phone</div>
          <div className="w-[80px] text-center"></div>
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
                />
              );
            })}
          </ul>
        ) : (
          <p>There is no any customer, add new customer 👇</p>
        )}
      </Table>

      <ShowButton>Add new Customer</ShowButton>
    </>
  );
}
