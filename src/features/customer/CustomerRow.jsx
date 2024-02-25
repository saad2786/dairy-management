import React from "react";
import toast from "react-hot-toast";
import TableRow from "../../ui/TableRow";

export default function CustomerRow({ id, name, dairy, cattle, phone }) {
  async function handleDelete() {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/customers/${id}`,
      {
        method: "DELETE",
      },
    );
    if (res.ok) {
      toast.success(`Successfully Deleted ${name}`);
    } else {
      const error = await res.json();
      console.log(error);

      toast.error(
        error ? "Delete all transactions first " : "Something went wrong!",
      );
    }
  }
  return (
    <TableRow>
      <div className="w-[80px] text-center">{id}</div>
      <div className="w-[250px] text-center">{name}</div>
      <div className="w-[120px] text-center">{dairy}</div>
      <div className="w-[150px] text-center">{cattle ? "Cow" : "Buffelo"}</div>
      <div className="w-[200px] text-center">{phone}</div>
      <button
        className="w-[100px] rounded-md bg-red-200 px-2 py-1 text-center text-xs  font-bold text-red-700 sm:text-base "
        onClick={handleDelete}
      >
        Delete
      </button>
    </TableRow>
  );
}
