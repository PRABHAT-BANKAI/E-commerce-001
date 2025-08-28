import axios from 'axios'
import { Link } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'

const Forgotpassword = () => {
    const [data, setData] = useState({ email: "" })
    const [cdata, setCdata] = useState({ password: "", confirmpass: "" })
    const [fetchData, setFetchData] = useState([])
    const [vboolean, setVboolean] = useState(false)
    const [userId, setUserId] = useState(null)
    const [error, setError] = useState({});


    function handleVerify() {

        if (!data.email.trim()) {
            alert("please Enter a valid Emial")
            return
        }
        let user = fetchData.find(
            (user) =>
                user.email.toLowerCase() === data.email.toLowerCase()

        );

        console.log(user)

        if (user) {

            setUserId(user.id)
            setVboolean(true)
            alert("verified")
            console.log(userId)
        }

        else {
            alert("please Enter a valid email id")
            setData({ email: "" })
        }
        console.log(userId)


    }


    async function handleSubmit(e) {
        e.preventDefault()
        if (handleError()) {
            await axios.patch(`http://localhost:3000/users/${userId}`, cdata)
            alert("your Password is successfully update")
        }

    }

    function handleError() {
        let obj = {};
        let val = true;




        if (!cdata.password.trim()) {
            val = false;
            obj.password = "Enter a valid password";
        } else if (cdata.password.length < 6) {
            val = false;
            obj.password = "Password length should be greater than or equal to 6";
        }


        if (!cdata.confirmpass.trim()) {
            val = false;
            obj.confirmpass = "Enter a valid confirm password";
        } else if (cdata.password !== cdata.confirmpass) {
            val = false;
            obj.confirmpass = "Confirm password does not match the password";
        }

        setError(obj);
        return val;
    }


    async function getData() {
        let data = await axios.get("http://localhost:3000/users")

        setFetchData(data.data)

    }

    useEffect(() => {
        getData()
    }, [])
    return (
           <div className="min-h-screen w-full flex items-center justify-center bg-[#a9bafc] p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left: Forgot Password Form */}
        <div className="px-10 py-10 md:px-14 md:py-14 flex flex-col justify-center">
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

          <h1 className="text-4xl font-extrabold text-[#1f2937] leading-tight">
            Forgot Password
          </h1>
          <p className="mt-2 text-[#6b7280] text-lg">
            Reset your password securely
          </p>

          {!vboolean ? (
            <>
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

              <button
                onClick={handleVerify}
                className="mt-6 w-full h-12 rounded-md bg-blue-600 text-white font-semibold hover:opacity-95 active:opacity-90 transition"
              >
                Verify Email
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              {/* New Password */}
              <label className="block text-[#374151] font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={cdata.password}
                onChange={(e) => setCdata({ ...cdata, password: e.target.value })}
                className="w-full h-12 rounded-md border border-[#e5e7eb] focus:border-[#134f42] focus:ring-4 focus:ring-[#134f42]/10 px-4 tracking-widest outline-none transition text-black"
              />
              {error.password && (
                <p className="text-red-600 text-sm mt-1">{error.password}</p>
              )}

              {/* Confirm Password */}
              <label className="block text-[#374151] font-medium mt-6 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                value={cdata.confirmpass}
                onChange={(e) => setCdata({ ...cdata, confirmpass: e.target.value })}
                className="w-full h-12 rounded-md border border-[#e5e7eb] focus:border-[#134f42] focus:ring-4 focus:ring-[#134f42]/10 px-4 tracking-widest outline-none transition text-black"
              />
              {error.confirmpass && (
                <p className="text-red-600 text-sm mt-1">{error.confirmpass}</p>
              )}

              <button
                type="submit"
                className="mt-6 w-full h-12 rounded-md bg-blue-600 text-white font-semibold hover:opacity-95 active:opacity-90 transition"
              >
                Update Password
              </button>
            </form>
          )}

          {/* Back to Login */}
          <p className="mt-6 text-[#6b7280]">
            Remember your password?{" "}
            <Link
              to="/"
              className="font-semibold text-[#111827] hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>

        {/* Right: Promo */}
        <div className="text-white relative bg-gradient-to-tr from-blue-400 via-blue-600 to-indigo-900">
          <div className="h-full w-full px-10 py-10 md:px-12 md:py-12 flex flex-col">
            <div className="mt-2 md:mt-4">
              <p className="text-4xl md:text-5xl font-extrabold leading-tight">
                Secure Account <br /> Strong Passwords
              </p>
            </div>

            <div className="mt-10 md:mt-14 bg-[#fbf7ee] text-[#0f3b32] rounded-2xl shadow-[inset_0_0_0_2px_rgba(15,59,50,0.15)] p-8 md:p-10 flex flex-col items-center">
              <p className="text-3xl md:text-4xl font-extrabold">Stay Safe</p>
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
    )
}

export default Forgotpassword