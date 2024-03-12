import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";

import TransactionRow from "./TransactionRow";

import NewTransaction from "./NewTransaction";
import Modal from "../../ui/Modal";
import { useTransaction } from "./useTransaction";

export default function TransactionTable() {
  const { openModal, closeModal, transactions, isLoading, error, isOpenModal } =
    useTransaction();

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <>
      <div className="mb-4 max-h-[70vh]  overflow-y-scroll rounded-md  shadow-md shadow-slate-700 ">
        <table className=" table  h-full  w-full overflow-y-scroll   border-t-2 ">
          <thead className="text-base  font-semibold shadow-sm shadow-slate-300">
            <tr className="border-b border-slate-500 bg-slate-200">
              <th>ID</th>
              <th>Customer</th>
              <th>Fat</th>
              <th>Cattle Type</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {transactions?.length ? (
              transactions.map((transaction) => {
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
              })
            ) : (
              <tr className="px-8 py-10 text-center">
                There is no any transaction, make new transaction 👇
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        className=" btn btn-success mt-2   rounded-xl px-3 py-2 font-sans text-sm   capitalize disabled:cursor-not-allowed disabled:bg-opacity-65   sm:text-base"
        onClick={openModal}
      >
        + Add Transaction
      </button>
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          <NewTransaction closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}
