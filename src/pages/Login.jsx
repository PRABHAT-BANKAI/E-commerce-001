import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../redux/feature/loginSlice";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const [error, setError] = useState({});

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, loading, error:loginError} = useSelector((state) => state.login)

  function handleLogin(e) {
    e.preventDefault();

    if (!validation()) return;
    dispatch(loginUser(data))


    if (validation()) {
      setData({ email: "", password: "" });
    }
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
      obj.password = "Password length should be greater than or equal to 6";
    }

    setError(obj);
    return val;
  }

  useEffect(() => {
    if(user){
      alert('login successful')
      navigate("/product")
      setData({ email: "", password: "" })
    }
    else {
      alert("Please enter a valid Email & Password");
    }
  }, [user,navigate])

  return (
    <div
      className="w-[100vw] h-[100vh] flex justify-center items-center bg-white"
      id="login"
    >
      <form
        className="border-black border-[2px] rounded-[25px] w-[500px] h-[500px] flex flex-col items-center"
        onSubmit={handleLogin}
      >
        <h2 className="text-[22px] font-medium mt-[18px] text-black">LOGIN</h2>



        <label className="w-[60%] h-[40px] flex justify-center mt-[30px]">
          <input
            className="w-[100%] pl-[20px] text-black border-b-[2px] border-black bg-transparent outline-none"
            type="email"
            placeholder="Enter Your Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </label>
        {error.email && (
          <p className="text-red-600 text-sm mt-1">{error.email}</p>
        )}

        <label className="w-[60%] h-[40px] flex justify-center mt-[30px]">
          <input
            className="w-[100%] pl-[20px] text-black border-b-[2px] border-black bg-transparent outline-none"
            type="password"
            placeholder="Enter Your Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </label>

        {error.password && (
          <p className="text-red-600 text-sm mt-1">{error.password}</p>
        )}

         {loginError && <p className="text-red-600 text-sm mt-2">{loginError}</p>}

        <Link to={"/fpass"}>
          <p>Forgot Password</p>
        </Link>

        <button
          type="submit"
          className="mt-[40px] border w-[250px] h-[40px] rounded-[5px] bg-white cursor-pointer">Submit
            {loading && <p className="text-white mt-2">Login...</p>}

          </button>

        <div className="flex mt-[20px] text-black">
          <p>Don't Have An Account?</p>
          <Link to={"/signup"}>
            <button className="text-blue-600 ml-2 cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;