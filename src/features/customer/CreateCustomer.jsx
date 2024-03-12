import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import SubmitButtton from "../../ui/SubmitButtton";
import { useAuthContext } from "../../context/useContext";
export default function CreateCustomer({ closeModal }) {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const { dairyId } = useAuthContext();
  const { mutate, status } = useMutation({
    mutationFn: (data) => onSubmit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      reset();
      closeModal();
    },
  });
  const isCreating = status === "pending";
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
        dairyId,
        cattle: data.cattle === "Buffelo" ? 0 : 1,
      }),
    });
    res.ok
      ? toast.success("Successfully created new customer ")
      : toast.error("Something went wrong!");
  }

  return (
    <>
      <h2 className="py-5 text-center">Create New Customer</h2>
      <form
        className="flex  flex-col items-center gap-10"
        onSubmit={handleSubmit(mutate)}
      >
        <input
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="text"
          required
          disabled={isCreating}
          placeholder="Customer Name"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        <input
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="text"
          disabled={isCreating}
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
          disabled={isCreating}
          required
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          placeholder="Select Cattle"
          id="cattle"
          {...register("cattle")}
        >
          <option className="   text-base font-semibold">Buffelo</option>
          <option className="   text-base font-semibold">Cow</option>
        </select>

        <SubmitButtton disabled={isCreating}>
          {isCreating ? <Spinner /> : "Create"}
        </SubmitButtton>
      </form>
    </>
  );
}
