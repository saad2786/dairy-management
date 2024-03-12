import React from "react";
import { useForm } from "react-hook-form";
import ChangeRate from "../features/rate/ChangeRate";
import CurrentRates from "../features/rate/CurrentRates";

export default function Rate() {
  return (
    <>
      <CurrentRates />
      <ChangeRate />
    </>
  );
}
