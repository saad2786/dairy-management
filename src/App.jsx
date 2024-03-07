import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CreateCustomer from "./features/customer/CreateCustomer";
import NewTransaction from "./features/transaction/NewTransaction";
import Bill from "./pages/Bill";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Rate from "./pages/Rate";
import Transaction from "./pages/Transaction";
import AppLayout from "./ui/AppLayout";
import { useAuthContext } from "./context/useAuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { dairyId } = useAuthContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              dairyId === null ? <Navigate to="/login" /> : <AppLayout />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer/new" element={<CreateCustomer />} />
            <Route path="/rate" element={<Rate />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/transaction/new" element={<NewTransaction />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/bill/:customerId" element={<Bill />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="bottom-right"
        gutter={20}
        containerStyle={{
          fontSize: "18px",
          fontWeight: "700",
          fontFamily: "monospace",
          padding: "20px",
          margin: "20px",
        }}
        toastOptions={{
          style: {
            width: "fit-content",
          },
          success: {
            duration: 5000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 5000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
