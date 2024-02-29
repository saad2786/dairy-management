import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import SubmitButtton from "../../ui/SubmitButtton";

export default function NewTransaction() {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (data) => onSubmit(data),
    onSuccess: () => {
      console.log(status);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  const isSubmitting = status === "pending";
  async function onSubmit(data) {
    try {
      console.log(status);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/transactions/new`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...data, dairyId: 4 }),
        },
      );
      const newTransaction = await res.json();
      console.log(newTransaction);
      if (newTransaction === 5) {
        toast.success("Successfully added new transaction ");
        reset();
      } else {
        toast.error("Invalid customer ID or cattle type ");
        throw new Error("Invalid customer ID or cattle type ");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-10  py-20  ">
      <h2 className="text-2xl font-extrabold tracking-wider  ">
        Add New Transaction
      </h2>
      <form
        className="flex  flex-col items-center gap-10"
        onSubmit={handleSubmit(mutate)}
      >
        <input
          className="h-12 w-[300px] rounded-lg border-2 border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-500 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[40vw]"
          type="text"
          required
          disabled={isSubmitting}
          placeholder="Customer ID"
          id="customerId"
          {...register("customerId", { required: "This field is required" })}
        />
        <select
          disabled={isSubmitting}
          required
          className="h-12 w-[300px] rounded-lg border-2 border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-500 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[40vw]"
          placeholder="Select Cattle"
          id="cattle"
          {...register("cattle")}
        >
          <option className="   text-base font-semibold">Buffelo</option>
          <option className="   text-base font-semibold">Cow</option>
        </select>
        <input
          className="h-12 w-[300px] rounded-lg border-2 border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-500 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[40vw]"
          type="number"
          step="0.01"
          disabled={isSubmitting}
          required
          placeholder="Milk fat"
          id="fat"
          {...register("fat", {
            required: "This field is required",
          })}
        />
        <input
          className="h-12 w-[300px] rounded-lg border-2 border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-500 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[40vw]"
          type="number"
          required
          disabled={isSubmitting}
          placeholder="Quantity(in Liters)"
          id="quantity"
          {...register("quantity", { required: "This field is required" })}
        />

        <SubmitButtton disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Add Transactions"}
        </SubmitButtton>
      </form>
      <button
        className="mt-2 w-80 rounded-xl bg-green-600 px-3 py-2 text-xl uppercase text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-opacity-65"
        onClick={() => navigate(-1)}
        disabled={isSubmitting}
      >
        Show Transctions
      </button>
    </div>
  );
}
