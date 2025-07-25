import React, { useState } from "react";
import { Link } from 'react-router'; 

const Login = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    if (validation()) {
      setData({ name: "", email: "", password: "" });
    }
  }

  function validation() {
    let obj = {};
    let val = true;

    if (!data.name.trim()) {
      val = false;
      obj.name = "Name is not valid";
    }
    if (!data.email.trim()) {
      val = false;
      obj.email = "Email is not valid";
    }
    if (!data.password.trim()) {
      val = false;
      obj.password = "Password is not valid";
    }

    setError(obj);
    return val;
  }

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-white' id='login'>
      <form
        className='border-black border-[2px] rounded-[25px] w-[500px] h-[500px] flex flex-col items-center'
        onSubmit={handleSubmit}
      >
        <h2 className='text-[22px] font-medium mt-[18px] text-black'>LOGIN</h2>

        <label className='w-[60%] h-[40px] flex justify-center mt-[30px]'>
          <input
            className='w-[100%] pl-[20px] text-black border-b-[2px] border-black bg-transparent outline-none'
            type='text'
            placeholder='Enter Your Name'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </label>
        {error.name && <p className="text-red-600 text-sm mt-1">{error.name}</p>}

        <label className='w-[60%] h-[40px] flex justify-center mt-[30px]'>
          <input
            className='w-[100%] pl-[20px] text-black border-b-[2px] border-black bg-transparent outline-none'
            type='email'
            placeholder='Enter Your Email'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </label>
        {error.email && <p className="text-red-600 text-sm mt-1">{error.email}</p>}

        <label className='w-[60%] h-[40px] flex justify-center mt-[30px]'>
          <input
            className='w-[100%] pl-[20px] text-black border-b-[2px] border-black bg-transparent outline-none'
            type='password'
            placeholder='Enter Your Password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </label>
        {error.password && <p className="text-red-600 text-sm mt-1">{error.password}</p>}

        <button
          type='submit'
          className='mt-[40px] border w-[250px] h-[40px] rounded-[5px] bg-white cursor-pointer'
        >
          Submit
        </button>

        <div className='flex mt-[20px] text-black'>
          <p>Don't Have An Account?</p>
          <Link to={"/signup"}>
            <button className='text-blue-600 ml-2 cursor-pointer'>Sign Up</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
