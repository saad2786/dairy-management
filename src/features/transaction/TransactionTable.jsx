import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";

import TransactionRow from "./TransactionRow";

import NewTransaction from "./NewTransaction";
import Modal from "../../ui/Modal";
import { useTransaction } from "./useTransaction";
import Sidebar from "../../ui/Sidebar";
import { useEffect, useState } from "react";
import ShowButton from "../../ui/ShowButton";

export default function TransactionTable() {
  const [customerId, setCustomerId] = useState("");
  const [fat, setFat] = useState("");
  const [isBuffeloChecked, setIsBuffeloChecked] = useState(false);
  const [isCowChecked, setIsCowChecked] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const { openModal, closeModal, transactions, isLoading, error, isOpenModal } =
    useTransaction();
  useEffect(
    function () {
      setFilteredTransactions(transactions);
      if (isBuffeloChecked) {
        setFilteredTransactions((prev) => {
          return prev.filter((transaction) =>
            transaction.CATTLE_TYPE ? null : transaction,
          );
        });
      }
      if (isCowChecked) {
        setFilteredTransactions((prev) => {
          return prev.filter((transaction) =>
            transaction.CATTLE_TYPE ? transaction : null,
          );
        });
      }
      if (customerId) {
        setFilteredTransactions((prev) => {
          return prev.filter((transaction) =>
            transaction.CUSTOMER_ID == customerId ? transaction : null,
          );
        });
      }
      if (fat) {
        setFilteredTransactions((prev) => {
          return prev.filter((transaction) => {
            return transaction.FAT == fat ? transaction : null;
          });
        });
      }
    },
    [isLoading, isBuffeloChecked, isCowChecked, customerId, fat],
  );
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <div className=" grid h-full  w-full  grid-cols-5 grid-rows-1">
      <Sidebar>
        <h2 className="text-3xl">Filters</h2>
        <div
          className="form-control
        px-5 py-4"
        >
          <h3 className="text-xl">Customer Wise</h3>
          <label className="input input-bordered textarea-md mt-2 flex items-center gap-2">
            Customer
            <input
              type="text"
              className="grow"
              onChange={(e) => {
                setCustomerId(e.target.value);
              }}
              value={customerId}
              placeholder="eg. 12"
            />
          </label>
        </div>
        <div
          className="form-control
        px-5 py-4"
        >
          <h3 className="text-xl">Fat</h3>
          <label className="input input-bordered textarea-md mt-2 flex items-center gap-2">
            Fat
            <input
              type="number"
              className="grow"
              placeholder="eg. 4"
              onChange={(e) => {
                setFat(e.target.value);
              }}
              value={fat}
            />
          </label>
        </div>

        <div
          className="form-control
        px-5 py-4"
        >
          <h3 className="text-xl">Cattle Type</h3>

          <label className="label flex w-fit  cursor-pointer gap-4 px-4">
            <input
              type="radio"
              className="radio h-5 w-5 border-slate-600"
              checked={isBuffeloChecked}
              onChange={() => {
                setIsCowChecked(false);
                setIsBuffeloChecked(true);
              }}
            />
            <span className="label-text text-lg">Buffelo</span>
          </label>
          <label className="label flex w-fit  cursor-pointer gap-4 px-4">
            <input
              type="radio"
              className="radio h-5 w-5  border-slate-600"
              checked={isCowChecked}
              onChange={() => {
                setIsCowChecked(true);
                setIsBuffeloChecked(false);
              }}
            />
            <span className="label-text text-lg">Cow</span>
          </label>
          <label className="label flex w-fit  cursor-pointer gap-4 px-4">
            <input
              type="radio"
              className="radio h-5 w-5  border-slate-600"
              checked={!isCowChecked && !isBuffeloChecked}
              onChange={() => {
                setIsCowChecked(false);
                setIsBuffeloChecked(false);
              }}
            />
            <span className="label-text text-lg">Both</span>
          </label>
        </div>
        <div></div>
      </Sidebar>
      <ShowButton openModal={openModal}>+ Add Transaction</ShowButton>
      <div className="col-span-4 mt-10 px-10 py-8">
        <div className="mb-4 max-h-[75vh]  overflow-y-scroll rounded-md  shadow-md shadow-slate-700 ">
          <table className=" table  h-full  w-full   border-t-2 ">
            <thead className="text-base  font-semibold text-slate-800 shadow-sm shadow-slate-300">
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
              {filteredTransactions?.length ? (
                filteredTransactions.map((transaction) => {
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
        {isOpenModal && (
          <Modal closeModal={closeModal}>
            <NewTransaction closeModal={closeModal} />
          </Modal>
        )}
      </div>
    </div>
  );
}
