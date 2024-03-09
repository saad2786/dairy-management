import { useContext, useEffect } from "react";
import { Context, DispatchContext } from "../../context/useContext";

export function useCalculateTransactionDetails({ transactions }) {
  const dispatch = useContext(DispatchContext);
  const { lastMonthBuffeloMilkQty, todayTransactionQty } = useContext(Context);
  useEffect(() => {
    const transactionDetails = {
      todayTransactionAmount: Math.floor(
        transactions?.reduce((amount, transaction) => {
          return (amount += transaction.PRICE);
        }, 0),
      ),
      todayTransactionQty: Math.floor(
        transactions?.reduce((qty, transaction) => (qty += transaction.QTY), 0),
      ),
      lastMonthBuffeloMilkQty: transactions?.reduce((qty, transaction) => {
        if (!transaction.CATTLE_TYPE) qty += transaction.QTY;
        return qty;
      }, 0),
      lastMonthCowMilkQty: transactions?.reduce((qty, transaction) => {
        if (transaction.CATTLE_TYPE) qty += transaction.QTY;
        return qty;
      }, 0),
      highestFatBuffelo: transactions?.reduce((fat, transaction) => {
        if (!transaction.CATTLE_TYPE) fat = Math.max(fat, transaction.FAT);
        return fat;
      }, 0),
      lowestFatBuffelo: transactions?.reduce((fat, transaction) => {
        if (!transaction.CATTLE_TYPE) fat = Math.min(fat, transaction.FAT);
        return fat;
      }, Infinity),
      highestFatCow: transactions?.reduce((fat, transaction) => {
        if (transaction.CATTLE_TYPE) fat = Math.max(fat, transaction.FAT);
        return fat;
      }, 0),
      lowestFatCow: transactions?.reduce((fat, transaction) => {
        if (transaction.CATTLE_TYPE) fat = Math.min(fat, transaction.FAT);
        return fat;
      }, Infinity),
    };
    dispatch({
      type: "transaction",
      payload: transactionDetails,
    });
  }, [transactions]);
}
