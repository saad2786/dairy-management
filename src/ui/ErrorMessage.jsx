import React from "react";
import { BiError } from "react-icons/bi";
export default function ErrorMessage() {
  return (
    <div className="flex flex-col items-center gap-10 rounded-xl bg-stone-50 px-8 py-10 shadow-lg">
      <BiError style={{ fontSize: "100px", color: "gold" }} />

      <p>Server is down right now , please try after some time🙏</p>
    </div>
  );
}
