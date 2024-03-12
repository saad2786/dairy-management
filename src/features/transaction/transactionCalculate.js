import { useContext, useEffect } from "react";
import { DispatchContext } from "../../context/useContext";
import { format, compareAsc } from "date-fns";

export function useCalculateTransactionDetails({ transactions }) {
  const dispatch = useContext(DispatchContext);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const today = new Date();
  const firstDateOfMonth = format(
    new Date(today.getFullYear(), today.getMonth(), 1),
    "yyyy-MM-dd",
  );
  useEffect(() => {
    const transactionDetails = {
      todayTransactionQty: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.DATE.slice(0, 10));
          if (transactionDate === format(new Date(currentDate), "yyyy-MM-dd"))
            qty += transaction.QTY;
          return qty;
        }, 0),
      ),
      todayTransactionAmount: Math.floor(
        transactions?.reduce((amount, transaction) => {
          const transactionDate = new Date(transaction.DATE.slice(0, 10));
          if (!compareAsc(currentDate, transactionDate)) {
            amount += transaction.PRICE;
          }
          return amount;
        }, 0),
      ),
      todayBuffeloMilk: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.DATE.slice(0, 10));
          if (
            !compareAsc(currentDate, transactionDate) &&
            !transaction.CATTLE_TYPE
          ) {
            qty += transaction.QTY;
          }
          return qty;
        }, 0),
      ),
      todayCowMilk: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.DATE.slice(0, 10));
          if (
            !compareAsc(currentDate, transactionDate) &&
            transaction.CATTLE_TYPE
          ) {
            qty += transaction.QTY;
          }
          return qty;
        }, 0),
      ),
      todayTransactionQty: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.DATE.slice(0, 10));
          if (!compareAsc(currentDate, transactionDate)) {
            qty += transaction.QTY;
          }
          return qty;
        }, 0),
      ),
      totalTransaction: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.DATE.slice(0, 10));
          if (
            transactionDate >= new Date(firstDateOfMonth) &&
            transactionDate <= new Date(currentDate)
          )
            qty += transaction.QTY;
          return qty;
        }, 0),
      ),
      buffeloTransaction: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.DATE.slice(0, 10));
          if (
            transactionDate >= new Date(firstDateOfMonth) &&
            transactionDate <= new Date(currentDate) &&
            !transaction.CATTLE_TYPE
          )
            qty += transaction.QTY;
          return qty;
        }, 0),
      ),
      cowTransaction: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.DATE.slice(0, 10));
          if (
            transactionDate >= new Date(firstDateOfMonth) &&
            transactionDate < new Date(currentDate) &&
            transaction.CATTLE_TYPE
          )
            qty += transaction.QTY;
          return qty;
        }, 0),
      ),
    };
    dispatch({
      type: "transaction",
      payload: transactionDetails,
    });
  }, [transactions, currentDate, dispatch, firstDateOfMonth]);
}
