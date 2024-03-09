import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context, DispatchContext } from "../context/useContext";
import Spinner from "../ui/Spinner";

export default function Login() {
  const dispatch = useContext(DispatchContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    let data = { username, password };

    try {
      setIsLoading(true);
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
      const dairyName = data[0].DAIRY_NAME;
      dispatch({
        type: "authenticate",
        payload: { dairyId, dairyName },
      });
      sessionStorage.setItem("dairyId", dairyId);
      sessionStorage.setItem("dairyName", dairyName);
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="ml-4 text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6 text-xl">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={(e) => handleLogin(e)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  disabled={isLoading}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input input-bordered"
                  autoComplete="username"
                  required
                  autoFocus
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="current-password"
                  name="password"
                  type="password"
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-success  disabled:cursor-not-allowed disabled:bg-opacity-65"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <div className="flex flex-col items-center justify-center gap-10 py-20">
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
    </div> */
}
