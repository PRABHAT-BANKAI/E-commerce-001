import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../redux/feature/loginSlice";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({});  
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error: loginError } = useSelector(
    (state) => state.login
  );

  function handleLogin(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (!validation()) return;

    dispatch(loginUser(data));
    setData({ email: "", password: "" });
  }

  function validation() {
    let obj = {};
    let val = true;

    if (!data.email.trim()) {
      val = false;
      obj.email = "Email is not valid";
    }
    if (!data.password.trim()) {
      val = false;
      obj.password = "Enter a valid password";
    } else if (data.password.length < 6) {
      val = false;
      obj.password = "Password length should be at least 6";
    }

    setFormError(obj);
    return val;
  }

  useEffect(() => {
    if (!hasSubmitted) return;

    if (user) {
      alert("Login successful");
      navigate("/home");
    } else if (Object.keys(formError).length === 0 && loginError) {
      alert("Invalid email or password");
    }
  }, [user, navigate, hasSubmitted, loginError, formError]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#a9bafc] p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl mt-[60px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left: Login Form */}
        <form
          onSubmit={handleLogin}
          className="px-10 py-10 md:px-14 md:py-14 flex flex-col justify-center"
        >
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-md bg-[#134f42] grid place-items-center">
              <div className="h-5 w-5 rounded-full bg-white grid place-items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-[#134f42]" />
              </div>
            </div>
            <span className="text-2xl font-semibold tracking-tight text-[#1f2937]">
              Apna Kart
            </span>
          </div>

          <h1 className="text-5xl font-extrabold text-[#1f2937] leading-tight">
            Log In
          </h1>
          <p className="mt-2 text-[#6b7280] text-lg">
            Welcome back to Apna Kart
          </p>

          {/* Email */}
          <label className="block text-[#374151] font-medium mt-8 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full h-12 rounded-md border border-[#e5e7eb] focus:border-[#134f42] focus:ring-4 focus:ring-[#134f42]/10 px-4 outline-none transition text-black"
          />
          {formError.email && (
            <p className="text-red-600 text-sm mt-1">{formError.email}</p>
          )}

          {/* Password */}
          <div className="flex items-center justify-between mt-6 mb-2">
            <label className="text-[#374151] font-medium">Password</label>
            <Link
              to="/fpass"
              className="text-[#6b7280] hover:text-[#374151] text-base"
            >
              Forgot?
            </Link>
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="w-full h-12 rounded-md border border-[#e5e7eb] focus:border-[#134f42] focus:ring-4 focus:ring-[#134f42]/10 px-4 tracking-widest outline-none transition text-black"
          />
          {formError.password && (
            <p className="text-red-600 text-sm mt-1">{formError.password}</p>
          )}
          {loginError && (
            <p className="text-red-600 text-sm mt-2">{loginError}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full h-12 rounded-md bg-blue-600 text-white font-semibold hover:opacity-95 active:opacity-90 transition"
          >
            {loading ? "Login..." : "Log in"}
          </button>

          <p className="mt-6 text-[#6b7280]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#111827] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>

        {/* Right: Promo */}
        <div className="text-white relative bg-gradient-to-tr from-blue-400 via-blue-600 to-indigo-900">
          <div className="h-full w-full px-10 py-10 md:px-12 md:py-12 flex flex-col">
            <div className="mt-2 md:mt-4">
              <p className="text-4xl md:text-5xl font-extrabold leading-tight">
                Mega Sale —<br /> Up to 50% Off
              </p>
            </div>

            <div className="mt-10 md:mt-14 bg-[#fbf7ee] text-[#0f3b32] rounded-2xl shadow-[inset_0_0_0_2px_rgba(15,59,50,0.15)] p-8 md:p-10 flex flex-col items-center">
              <p className="text-3xl md:text-4xl font-extrabold">Shop Deals</p>
              <div className="mt-8 w-full">
                <div className="h-12 rounded-lg border-2 border-[#0f3b32]/50 bg-transparent px-4 flex items-center" />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 pointer-events-none">
              <div className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
