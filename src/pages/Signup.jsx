import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
    phoneno: "",
  });
  const [error, setError] = useState({});
  const [fetchData, setFetchData] = useState([]);

  const [submit, setSubmitData] = useState(null);

  const navigate = useNavigate();


  async function getData() {
    let userData = await axios.get(`http://localhost:3000/users`);
    setFetchData(userData.data);
  }


  async function handlesubmit(e) {
    e.preventDefault();

    if (!handleError()) return;

    const isEmailTaken = fetchData.some(
      (user) => user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (isEmailTaken) {
      setError((prev) => ({
        ...prev,
        email: "Email is already registered",
      }));
      return;
    }

    if (handleError()) {
      try {
        const res = await axios.post("http://localhost:3000/users", data);
        setSubmitData(res.data);

        setData({
          name: "",
          email: "",
          password: "",
          confirmpass: "",
          phoneno: "",
        });

        alert("You are successfully signup");
        navigate("/");
      } catch (error) {
        console.error("Failed to submit data:", error);
      }
    }
  }

  function handleError() {
    let obj = {};
    let val = true;

    if (!data.name.trim()) {
      val = false;
      obj.name = "Enter a valid name";
    }

    if (!data.email.trim()) {
      val = false;
      obj.email = "Enter a valid email";
    }

    if (!data.password.trim()) {
      val = false;
      obj.password = "Enter a valid password";
    } else if (data.password.length < 6) {
      val = false;
      obj.password = "Password length should be greater than or equal to 6";
    }

    if (!data.phoneno.trim()) {
      val = false;
      obj.phoneno = "Enter a valid Phone No";
    } else if (data.phoneno.length < 10) {
      val = false;
      obj.phoneno = "Phone number length should be at least 10 digits";
    }

    if (!data.confirmpass.trim()) {
      val = false;
      obj.confirmpass = "Enter a valid confirm password";
    } else if (data.password !== data.confirmpass) {
      val = false;
      obj.confirmpass = "Confirm password does not match the password";
    }

    setError(obj);
    return val;
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-[100vw] h-[100vh]  relative" id="signup">
      <form
        className=" border-white border-[2px] rounded-[25px] w-[500px] h-[600px] flex flex-col  items-center absolute top-[10%] left-[12%]"
        id="signupform"
        action=""
        onSubmit={handlesubmit}
      >
        <h2 className="text-[22px] font-medium mt-[18px] text-white">
          CREATE ACCOUNT
        </h2>
        <label
          htmlFor=""
          className="w-[60%]  h-[40px] flex justify-center mt-[30px]"
          id="name"
        >
          <input
            className="w-[100%] pl-[20px]   text-white"
            type="text"
            placeholder="Enter Your Full Name"
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
        </label>
        {error.name && <p style={{ color: "red" }}>{error.name}</p>}
        <label
          htmlFor=""
          id="email"
          className="w-[60%]  h-[40px] flex justify-center mt-[30px]"
        >
          <input
            className="w-[100%] pl-[20px]  text-white"
            placeholder="Enter Your E-mail"
            type="email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </label>
        {error.email && <p style={{ color: "red" }}>{error.email}</p>}
        <label
          htmlFor=""
          className="w-[60%]  h-[40px] flex justify-center mt-[30px]"
        >
          <input
            type="number"
            id="number"
            placeholder="Enter Your Phone No"
            value={data.phoneno}
            className=" w-[100%] pl-[20px] text-white"
            onChange={(e) => {
              setData({ ...data, phoneno: e.target.value });
            }}
          />
        </label>
        {error.phoneno && <p style={{ color: "red" }}>{error.phoneno}</p>}

        <label
          htmlFor=""
          name="radio"
          className="mt-[30px]  w-[60%] h-[40px] flex justify-center items-center relative text-white"
        >
          <p className="absolute left-[15px] font-medium text-[17px]">
            Gender :-
          </p>{" "}
          <input
            type="radio"
            className="w-[20px] absolute right-[180px] h-[15px] border"
            name="radio"
            required
          />{" "}
          <p className="absolute right-[145px]">Male</p>{" "}
          <input
            type="Radio"
            className="absolute left-[180px] w-[20px] h-[15px] border "
            name="radio"
          />
          <p className="absolute left-[200px]">Female</p>
        </label>

        <label
          htmlFor=""
          className="w-[60%]  h-[40px] flex justify-center mt-[15px]"
        >
          <input
            id="newPass"
            className=" w-[100%] pl-[20px]  text-white"
            type="password"
            placeholder="Enter Your new Password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </label>
        {error.password && <p style={{ color: "red" }}>{error.password}</p>}

        <label
          htmlFor=""
          className="w-[60%]  h-[40px] flex justify-center mt-[15px]"
        >
          <input
            className=" w-[100%] pl-[20px]  text-white"
            id="conPass"
            placeholder="Enter Confirm Password"
            type="password"
            value={data.confirmpass}
            onChange={(e) => {
              setData({ ...data, confirmpass: e.target.value });
            }}
          />
        </label>
        {error.confirmpass && (
          <p style={{ color: "red" }}>{error.confirmpass}</p>
        )}

        <button className="mt-[40px] border w-[250px] h-[40px] rounded-[5px] bg-white cursor-pointer">
          submit
        </button>

        <div className="flex mt-[20px]  text-white">
          <p>If You Have Already Account ?</p>
          <Link to={"/"}>
            {" "}
            <button className="text-cyan-400 cursor-pointer pl-[10px]">
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
