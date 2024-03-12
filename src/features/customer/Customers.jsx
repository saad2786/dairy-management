import Loader from "../../ui/Loader";
import CustomerRow from "./CustomerRow";
import ShowButton from "../../ui/ShowButton";
import ErrorMessage from "../../ui/ErrorMessage";
import CreateCustomer from "./CreateCustomer";
import Modal from "../../ui/Modal";
import { useCustomer } from "./useCustomer";

export default function Customers() {
  const {
    customers,
    isFetching,
    isLoading,
    error,
    isOpenModal,
    openModal,
    closeModal,
  } = useCustomer();
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <div className="">
      <div>
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
                    isFetching={isFetching}
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
        {isOpenModal && (
          <Modal closeModal={closeModal}>
            <CreateCustomer closeModal={closeModal} />
          </Modal>
        )}
        <ShowButton openModal={openModal}>+ Add Customer</ShowButton>
      </div>
    </div>
  );
}
