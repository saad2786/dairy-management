import React from "react";

export default function SubmitButtton({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="pb rounded-xl bg-blue-600 px-3 py-2 text-xl uppercase text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-opacity-65 sm:w-[35vw]"
    >
      {children}
    </button>
  );
}
