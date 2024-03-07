import React from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

export default function Navbar() {
  const { dairyId } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="flex h-16 items-center justify-between bg-stone-800 py-2">
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
      {dairyId !== null ? (
        <button
          className=" mr-4 w-40 rounded-xl bg-green-600 px-3 py-2 text-xl uppercase text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-opacity-65"
          onClick={() => {
            sessionStorage.clear();
            navigate("login");
          }}
        >
          Logout
        </button>
      ) : (
        <NavLink to="login">
          <button className=" w-40 rounded-xl bg-green-600 px-3 py-2 text-xl uppercase text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-opacity-65">
            Login
          </button>
        </NavLink>
      )}
    </div>
  );
}
