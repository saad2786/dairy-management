import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import TableRow from "../../ui/TableRow";

export default function CustomerRow({
  id,
  name,
  dairy,
  cattle,
  phone,
  status,
}) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
  async function handleDelete() {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/customers/${id}`,
      {
        method: "DELETE",
      },
    );
    if (res.ok) {
      toast.success(`Successfully deleted ${name} `);
    } else {
      toast.error(
        "You use this as reference, can't delete it until deleted from Others",
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
      <div
        className={`w-[100px] rounded-md ${status ? "bg-green-200" : "bg-red-200"} px-2 py-1 text-center text-xs  font-bold ${status ? "text-green-700" : "text-red-700"}  sm:text-base`}
        onClick={mutate}
      >
        {status ? "Active" : "Deactive"}
      </div>
    </TableRow>
  );
}
