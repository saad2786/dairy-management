import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function Card({ bill, payBill }) {
  return (
    <>
      <div className="stats  w-1/4 bg-slate-100 px-4 py-3 shadow-md">
        <div className="stat">
          <div className="stat-title text-xl">
            Customer ID:{bill.CUSTOMER_ID}
          </div>
          <div className="stat-value">{Math.floor(bill.PRICE)}.00</div>
          <div className="stat-desc">
            {bill.FROM_DATE.slice(0, 10)} to {bill.TO_DATE.slice(0, 10)}
          </div>

          <div className="mt-4 flex items-center justify-between">
            {!bill.STATUS && (
              <div className="badge badge-error gap-2 px-4 py-3">Pending</div>
            )}
            <button
              onClick={payBill}
              className="btn btn-success shadow-md   disabled:bg-white disabled:bg-opacity-90 disabled:text-green-600"
              disabled={bill.STATUS}
            >
              {bill.STATUS ? (
                <p className="flex items-center  gap-2 ">
                  Paid
                  <IoMdCheckmarkCircleOutline />
                </p>
              ) : (
                "Pay"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
