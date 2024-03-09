import { useContext, useEffect } from "react";
import { Context, DispatchContext } from "../../context/useContext";
import { useQuery } from "@tanstack/react-query";
import BillCards from "./BillCards";

import ErrorMessage from "../../ui/ErrorMessage";
import { fetchBills } from "./fetchBills";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import useBill from "./useBill";

export default function Bills() {
  const navigate = useNavigate();
  const { bills, isFetching, error } = useBill();
  if (isFetching) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <>
      <BillCards bills={bills} />
      <button
        className="btn btn-active absolute bottom-10 left-10"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </>
  );
}
