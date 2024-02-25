import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ChangeRate() {
  const { isSubmitting, register, handleSubmit } = useForm();
  async function onSubmit(data) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/rates/new`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data, dairyId: 4 }),
      });
      if (res.ok) {
        toast.success("Rate milk changed successfully");
      } else {
        toast.error("Somthing went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex w-[80vw] flex-col items-center justify-center gap-10  py-10  ">
      <form
        className="flex w-full  flex-col items-center gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          required
          disabled={isSubmitting}
          placeholder="Rate(Price/Ltr)"
          id="quantity"
          {...register("rate", { required: "This field is required" })}
        />

        <button
          disabled={isSubmitting}
          className="pb rounded-xl bg-blue-600 px-3 py-2 text-xl uppercase text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-opacity-65 sm:w-[35vw] "
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
