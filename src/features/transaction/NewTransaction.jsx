import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewTransaction() {
  const { isSubmitting, handleSubmit, register } = useForm();
  const navigate = useNavigate();
  async function onSubmit(data) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/transaction/new`,
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
      if (res.ok) {
        toast.success("Successfully added");
      } else {
        toast.error("There is problem!");
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
        onSubmit={handleSubmit(onSubmit)}
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

        <button
          disabled={isSubmitting}
          className="pb rounded-xl bg-blue-600 px-3 py-2 text-xl uppercase text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-opacity-65 sm:w-[35vw] "
        >
          Add Transaction
        </button>
      </form>
      <button
        className="mt-2 w-80 rounded-xl bg-green-600 px-3 py-2 text-xl uppercase text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-opacity-65"
        onClick={() => navigate(-1)}
      >
        See Transactions
      </button>
    </div>
  );
}
