import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShowButton({ children }) {
  const navigate = useNavigate();
  return (
    <button
      className="mt-2 w-full rounded-xl bg-green-600 px-3 py-2 text-xl uppercase text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-opacity-65"
      onClick={() => navigate("new")}
    >
      {children}
    </button>
  );
}
