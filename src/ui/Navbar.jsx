import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-12 bg-stone-800 py-2">
      <ul className="mx-auto flex w-[60%] items-center justify-between gap-4 text-xl font-normal text-white">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="customer">Customer</NavLink>
        </li>
        <li>
          <NavLink to="transaction">Transaction</NavLink>
        </li>
        <li>
          <NavLink to="bill">Bill</NavLink>
        </li>
        <li>
          <NavLink to="rate">Rate</NavLink>
        </li>
      </ul>
    </div>
  );
}
