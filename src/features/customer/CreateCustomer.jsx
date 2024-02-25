import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateCustomer() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { isSubmitting } = formState;
  const navigate = useNavigate();
  async function onSubmit(data) {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/customers/new`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        dairyId: 4,
        cattle: data.cattle === "Buffelo" ? 0 : 1,
      }),
    });

    if (res.ok) {
      toast.success("Successfully created new customer ");
      reset();
    } else {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10  py-20  ">
      <h2 className="text-2xl font-extrabold tracking-wider  ">
        Create New Customer
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
          placeholder="Customer Name"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        <input
          className="h-12 w-[300px] rounded-lg border-2 border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-500 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[40vw]"
          type="text"
          disabled={isSubmitting}
          required
          placeholder="Contact Number"
          id="phone"
          {...register("phone", {
            required: "This field is required",
            minLength: {
              value: 10,
              message: "Invalid Phone Number",
            },
            maxLength: {
              value: 13,
              message: "Invalid Phone Number",
            },
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

        <button
          disabled={isSubmitting}
          className="pb rounded-xl bg-blue-600 px-3 py-2 text-xl uppercase text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-opacity-65 sm:w-[35vw]"
        >
          Create Customer
        </button>
      </form>
      <button
        className="mt-2 w-80 rounded-xl bg-green-600 px-3 py-2 text-xl uppercase text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-opacity-65"
        onClick={() => navigate(-1)}
      >
        See Customers
      </button>
    </div>
  );
}
