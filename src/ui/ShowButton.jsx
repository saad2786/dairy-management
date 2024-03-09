import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShowButton({ children }) {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-success mx-auto mt-8 text-base disabled:cursor-not-allowed disabled:bg-opacity-65 "
      onClick={() => navigate("new")}
    >
      {children}
    </button>
  );
}
