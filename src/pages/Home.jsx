import React from "react";
import { useAuthContext } from "../context/useAuthContext";

export default function Home() {
  const { dairyId } = useAuthContext();
  return <div>Home Page of Dairy with dairy id : {dairyId}</div>;
}
