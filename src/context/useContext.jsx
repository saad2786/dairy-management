import React, { createContext, useContext, useReducer } from "react";

export const Context = createContext();
export const DispatchContext = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const data = {
    ...state,
    inactiveCustomer: state.totalCustomer - state.activeCustomer,
  };

  return (
    <Context.Provider value={data}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
};

const INITIAL_STATE = {
  dairyId: sessionStorage.getItem("dairyId"),
  dairyName: sessionStorage.getItem("dairyName"),
  totalCustomer: 0,
  activeCustomer: 0,
  paidCustomer: 0,
  unpaidCustomer: 0,
  todayTransactionsAmount: 0,
  todayTransactionQty: 0,
  lastMonthBuffeloMilkQty: 0,
  lastMonthCowMilkQty: 0,
  highestFatBuffelo: 0,
  highestFatCow: 0,
  lowestFatBuffelo: Infinity,
  lowestFatCow: Infinity,
};

function reducer(state, action) {
  switch (action.type) {
    case "authenticate":
      return {
        ...state,
        dairyId: action.payload.dairyId,
        dairyName: action.payload.dairyName,
      };
    case "customer":
      return {
        ...state,
        totalCustomer: action.payload.totalCustomer,
        activeCustomer: action.payload.activeCustomer,
      };
    case "transaction":
      return {
        ...state,
        todayTransactionAmount: action.payload.todayTransactionAmount,
        todayTransactionQty: action.payload.todayTransactionQty,
        lastMonthBuffeloMilkQty: action.payload.lastMonthBuffeloMilkQty,
        lastMonthCowMilkQty: action.payload.lastMonthCowMilkQty,
        highestFatBuffelo: action.payload.highestFatBuffelo,
        lowestFatBuffelo: action.payload.lowestFatBuffelo,
        highestFatCow: action.payload.highestFatCow,
        lowestFatCow: action.payload.lowestFatCow,
      };
    case "bill":
      return {
        ...state,
        paidCustomer: action.payload.paidCustomer,
        unpaidCustomer: action.payload.unpaidCustomer,
      };
    default:
      throw new Error("Unknown error: " + action.type);
  }
}

// async function fetchDetails() {
//   const customers = await fetchCustomers();
//   const transactions = await fetchTransactions();

//   const customerDetails = {
//     totalCustomer: customers?.length || 0,
//     activeCustomer:
//       customers?.filter?.((customer) => customer?.STATUS && customer).length ||
//       0,
//   };

//   const transactionDetails = {
//     todayTransactionAmount: Math.floor(
//       transactions?.reduce(
//         (amount, transaction) => (amount += transaction.PRICE),
//         0,
//       ),
//     ),
//     todayTransactionQty: Math.floor(
//       transactions?.reduce((qty, transaction) => (qty += transaction.QTY), 0),
//     ),
//     lastMonthBuffeloMilkQty: transactions?.reduce((qty, transaction) => {
//       if (!transaction.CATTLE_TYPE) qty += transaction.QTY;
//       return qty;
//     }, 0),
//     lastMonthCowMilkQty: transactions?.reduce((qty, transaction) => {
//       if (transaction.CATTLE_TYPE) qty += transaction.QTY;
//       return qty;
//     }, 0),
//     highestFatBuffelo: transactions?.reduce((fat, transaction) => {
//       if (!transaction.CATTLE_TYPE) fat = Math.max(fat, transaction.FAT);
//       return fat;
//     }, 0),
//     lowestFatBuffelo: transactions?.reduce((fat, transaction) => {
//       if (!transaction.CATTLE_TYPE) fat = Math.min(fat, transaction.FAT);
//       return fat;
//     }, Infinity),
//     highestFatCow: transactions?.reduce((fat, transaction) => {
//       if (transaction.CATTLE_TYPE) fat = Math.max(fat, transaction.FAT);
//       return fat;
//     }, 0),
//     lowestFatCow: transactions?.reduce((fat, transaction) => {
//       if (transaction.CATTLE_TYPE) fat = Math.min(fat, transaction.FAT);
//       return fat;
//     }, Infinity),
//   };

//   return { customerDetails, transactionDetails };
// }

export const useAuthContext = () => useContext(Context);
