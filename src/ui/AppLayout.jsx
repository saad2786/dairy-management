import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <div className="flex h-fit min-h-screen w-screen flex-col ">
      <Navbar />
      <div className=" h-[calc(100vh - 48px)] mx-auto w-4/5   px-4 py-4  md:px-12 md:py-8">
        <Outlet />
      </div>
    </div>
  );
}
