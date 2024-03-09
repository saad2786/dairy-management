import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "../../ui/DatePicker";
import SubmitButtton from "../../ui/SubmitButtton";
import Spinner from "../../ui/Spinner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";

export default function GenerateBill({ setBills }) {
  const { register, handleSubmit, reset, control } = useForm();
  const { dairyId } = useAuthContext();
  const navigate = useNavigate();
  const { mutate, status } = useMutation({
    mutationFn: (data) => onSubmit(data),
    onError: () => {
      toast.error("Somthing went wrong!");
    },
  });
  const isCreating = status === "pending";
  async function onSubmit(data) {
    console.log();
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/bills`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data, dairyId }),
      });

      const records = await res.json();
      reset();
      setBills(records.recordset);
      toast.success("Bill have been created");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 py-10">
      <h2 className="font-semibold">Calculate Bill</h2>
      <form
        className="flex w-full flex-col items-center gap-10"
        onSubmit={handleSubmit(mutate)}
      >
        <input
          className="h-12 w-[300px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-500 focus:outline-none focus:ring-2 disabled:bg-opacity-65 sm:w-[40vw]"
          type="text"
          disabled={isCreating}
          required
          placeholder="Customer Id"
          id="customerId"
          {...register("customerId", {
            required: "This field is required",
          })}
        />
        <DatePicker
          control={control}
          placeholder="From which date?"
          name="fromDate"
          disabled={isCreating}
        />
        <DatePicker
          control={control}
          placeholder="upto which date?"
          name="toDate"
          disabled={isCreating}
        />
        <SubmitButtton disabled={isCreating}>
          {isCreating ? <Spinner /> : "Get Bill"}
        </SubmitButtton>
      </form>
      <button
        className="btn btn-active  w-80 rounded-xl px-3 py-2 text-xl uppercase  disabled:cursor-not-allowed disabled:bg-opacity-65"
        onClick={() => navigate("new")}
      >
        See Bills
      </button>
    </div>
  );
}
