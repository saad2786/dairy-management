import { useContext } from "react";
import { Context } from "../../context/useContext";

import { useCustomer } from "../customer/useCustomer";
import { useTransaction } from "../transaction/useTransaction";
import { useRate } from "../rate/useRate";

export function useDashBoard() {
  const state = useContext(Context);

  const { isFetching: customerFetching, error: customerError } = useCustomer();
  const { isFetching: transactionFetching, error: transactionError } =
    useTransaction();
  const { isFetching: rateFetching, error: rateError } = useRate();
  return {
    state,
    customerFetching,
    transactionFetching,
    customerError,
    transactionError,
    rateFetching,
    rateError,
  };
}
//   const dispatch = useContext(DispatchContext);
//   const { dairyId } = state;
//   //Customer Data
//   const {
//     data: customers,
//     isFetching: isFetchingCustomers,
//     error: customerError,
//   } = useQuery({
//     queryKey: ["customers"],
//     queryFn: () => fetchCustomers(dairyId),
//   });
//   //Transactions Data
//   const {
//     data: transactions,
//     isFetching: isFetchingTransactions,
//     error: transactionsError,
//   } = useQuery({
//     queryKey: ["transactions"],
//     queryFn: () => fetchTransactions(dairyId),
//   });

//   useEffect(() => {
//     const customerDetails = {
//       totalCustomer: customers?.length,
//     };
//     dispatch({
//       type: "customer",
//       payload: customerDetails,
//     });
//   }, [customers, dispatch]);
//   const isFetching = isFetchingCustomers || isFetchingTransactions;
//   console.log(state);
//   useCalculateTransactionDetails({ transactions });
