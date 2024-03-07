import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/useAuthContext";

export default function Login() {
  const { setDairyId } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    let data = { username, password };

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      data = await res.json();
      const dairyId = data[0].DAIRY_ID;
      setDairyId(dairyId);
      sessionStorage.setItem("dairyId", dairyId);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-20">
      <h1 className="text-2xl font-extrabold tracking-wider">Sign in</h1>
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col items-center gap-10"
      >
        <section className="flex flex-col items-start gap-1">
          <label htmlFor="username" className="text-xl">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 w-[300px] rounded-lg border-2 border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-500 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
            autoComplete="username"
            required
            autoFocus
          />
        </section>
        <section className="flex flex-col items-start gap-1">
          <label htmlFor="current-password" className="text-xl">
            Password
          </label>
          <input
            id="current-password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-[300px] rounded-lg border-2 border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-500 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
            autoComplete="current-password"
            required
          />
        </section>
        <button
          type="submit"
          className="mt-2 w-80 rounded-xl bg-green-600 px-3 py-2 text-xl uppercase text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-opacity-65"
        >
          Sign in
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
