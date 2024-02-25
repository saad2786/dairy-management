import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCustomer from "./features/customer/CreateCustomer";
import NewTransaction from "./features/transaction/NewTransaction";
import Bill from "./pages/Bill";
import Customer from "./pages/Customer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Rate from "./pages/Rate";
import Transaction from "./pages/Transaction";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer/new" element={<CreateCustomer />} />
            <Route path="/rate" element={<Rate />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/transaction/new" element={<NewTransaction />} />
            <Route path="/bill" element={<Bill />} />
          </Route>
          <Route path="/login" element={<Login />} />
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
    </>
  );
}

export default App;
