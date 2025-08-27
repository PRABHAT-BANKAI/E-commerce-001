import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router"; // ✅ fixed import
import { resetSignupState, signupUser } from "../redux/feature/userSlice";
import { CheckCircle2, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
    phoneno: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, signupSuccess, error } = useSelector((state) => state.users);


  const passwordChecks = {
    length: data.password.length >= 6,
    numberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(data.password),
    upperLower: /[a-z]/.test(data.password) && /[A-Z]/.test(data.password),
  };

  const allPasswordValid = Object.values(passwordChecks).every(Boolean);

  function handlesubmit(e) {
    e.preventDefault();
    if (!handleError()) return;
    dispatch(signupUser(data));
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
      obj.password = "Password must be at least 6 characters";
    }

    if (!data.phoneno.trim()) {
      val = false;
      obj.phoneno = "Enter a valid phone number";
    } else if (data.phoneno.length < 10) {
      val = false;
      obj.phoneno = "Phone number must be at least 10 digits";
    }

    if (!data.confirmpass.trim()) {
      val = false;
      obj.confirmpass = "Enter confirm password";
    } else if (data.password !== data.confirmpass) {
      val = false;
      obj.confirmpass = "Passwords do not match";
    }

    setFieldErrors(obj);
    return val;
  }

  useEffect(() => {
    if (signupSuccess) {
      alert("Signup successful");
      navigate("/");
      dispatch(resetSignupState());
    }
  }, [signupSuccess, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#a9bafc]">
      <div className="relative w-full max-w-6xl bg-white rounded-[32px] shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Section */}
        <div className="p-10 relative z-10">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              ←
            </button>
            <p>
              Already member?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <h2 className="text-4xl font-extrabold mt-8">Sign Up</h2>
          <p className="text-gray-400 text-sm mt-1">
            Secure Your Communications with Easymail
          </p>

          {/* Form */}
          <form onSubmit={handlesubmit} className="mt-10 space-y-6">
            {/* Name */}
            <div className="flex items-center gap-3 border-b border-gray-300">
              <User className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full py-3 outline-none placeholder-gray-400"
              />
              {data.name && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            </div>
            {fieldErrors.name && <p className="text-red-500 text-xs">{fieldErrors.name}</p>}

            {/* Email */}
            <div className="flex items-center gap-3 border-b border-gray-300">
              <Mail className="h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full py-3 outline-none placeholder-gray-400"
              />
              {data.email && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            </div>
            {fieldErrors.email && <p className="text-red-500 text-xs">{fieldErrors.email}</p>}
            {error && <p className="text-red-500 text-xs">{error}</p>} {/* ✅ API error */}

            {/* Phone */}
            <div className="flex items-center gap-3 border-b border-gray-300">
                 {/* <Lock className="h-4 w-4 text-gray-400" /> */}
                 <IoPhonePortraitOutline className="h-4 w-4 text-gray-400"  />
              <input
                type="tel"
                placeholder="Phone Number"
                value={data.phoneno}
                onChange={(e) => setData({ ...data, phoneno: e.target.value })}
                className="w-full  py-3 border-b border-gray-300 outline-none placeholder-gray-400"
              />
            </div>

            {fieldErrors.phoneno && <p className="text-red-500 text-xs">{fieldErrors.phoneno}</p>}

            {/* Password */}
            <div className="flex items-center gap-3 border-b border-gray-300">
              <Lock className="h-4 w-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="w-full py-3 outline-none placeholder-gray-400"
              />

              {showPassword ? (
                <EyeOff
                  className="h-4 w-4 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="h-4 w-4 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {fieldErrors.password && <p className="text-red-500 text-xs">{fieldErrors.password}</p>}


            <ul className="mt-2 text-xs space-y-1">
              <li className={`flex items-center gap-1 ${passwordChecks.length ? "text-emerald-600" : "text-gray-500"}`}>
                {passwordChecks.length && <CheckCircle2 className="w-3 h-3" />}
                At least 6 characters
              </li>
              <li className={`flex items-center gap-1 ${passwordChecks.numberOrSymbol ? "text-emerald-600" : "text-gray-500"}`}>
                {passwordChecks.numberOrSymbol && <CheckCircle2 className="w-3 h-3" />}
                At least one number or symbol
              </li>
              <li className={`flex items-center gap-1 ${passwordChecks.upperLower ? "text-emerald-600" : "text-gray-500"}`}>
                {passwordChecks.upperLower && <CheckCircle2 className="w-3 h-3" />}
                Lowercase and uppercase letters
              </li>
            </ul>

            {/* Confirm Password */}
            <div className="flex items-center gap-3 border-b border-gray-300">
              <Lock className="h-4 w-4 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={data.confirmpass}   // ✅ use confirmpass
                onChange={(e) => setData({ ...data, confirmpass: e.target.value })}  // ✅ same here
                className="w-full py-3 outline-none placeholder-gray-400"
              />

              {showConfirmPassword ? (
                <EyeOff
                  className="h-4 w-4 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <Eye
                  className="h-4 w-4 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>

            {fieldErrors.confirmpass && (
              <p className="text-red-500 text-xs">{fieldErrors.confirmpass}</p>
            )}

            {/* Button */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-full text-white font-medium shadow-md hover:shadow-lg transition bg-blue-600"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              <span className="text-sm text-gray-500">Or</span>
              <div className="flex gap-2">
                <button type="button" className="h-10 w-10 rounded-full bg-gray-100 flex justify-center items-center"><FaGoogle /></button>
                <button type="button" className="h-10 w-10 rounded-full bg-gray-100 flex justify-center items-center"><FaFacebookF /></button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Section (unchanged UI) */}
        <div className="relative bg-gradient-to-tr from-blue-400 via-blue-600 to-indigo-900">
          {/* Card 1 */}
          <div className="w-40 h-56 bg-white rounded-3xl shadow-md flex flex-col items-center justify-between p-4 ml-[60px] mt-[55px] ">
            {/* Top Text */}
            <div className="w-full text-left">
              <p className="text-sm text-orange-400 font-medium">Inbox</p>
              <h2 className="text-2xl font-bold text-gray-900">176,18</h2>
            </div>

            {/* Circle */}
            <div className="w-12 h-12 bg-[#0d0d1f] text-white rounded-full flex items-center justify-center text-sm font-semibold shadow">
              45
            </div>

            {/* Waves */}
            <div className="w-full flex justify-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 30"
                className="w-28 h-8"
              >
                <path
                  d="M0,20 C20,10 40,30 60,20 C80,10 100,30 120,20"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="transparent"
                />
                <path
                  d="M0,20 C20,30 40,10 60,20 C80,30 100,10 120,20"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  fill="transparent"
                />
              </svg>
            </div>
          </div>

          {/* Card 2 */}
          <div className="absolute bottom-39 left-40 bg-white rounded-2xl shadow-lg p-6 w-72">
            <div className="h-2 w-16 bg-blue-400 rounded-full mb-3" />
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-600" />
              <div>
                <div className="font-semibold">Your data, your rules</div>
                <div className="text-xs mt-1 text-gray-500">
                  Your data belongs to you, and our encryption ensures that
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;




// import axios from "axios"; import React, { useEffect, useState } from "react"; import { useDispatch, useSelector } from "react-redux"; import { Link, useNavigate } from "react-router"; import { resetSignupState, signupUser } from "../redux/feature/userSlice"; import { CheckCircle2, Eye, Lock, Mail, User } from "lucide-react"; const Signup = () => { const [data, setData] = useState({ name: "", email: "", password: "", confirmpass: "", phoneno: "", }); const [error, setError] = useState({}); const navigate = useNavigate(); const dispatch = useDispatch() const { loading, signupSuccess } = useSelector((state) => state.users); function handlesubmit(e) { e.preventDefault() if (!handleError()) return; dispatch(signupUser(data)); } function handleError() { let obj = {}; let val = true; if (!data.name.trim()) { val = false; obj.name = "Enter a valid name"; } if (!data.email.trim()) { val = false; obj.email = "Enter a valid email"; } if (!data.password.trim()) { val = false; obj.password = "Enter a valid password"; } else if (data.password.length < 6) { val = false; obj.password = "Password length should be greater than or equal to 6"; } if (!data.phoneno.trim()) { val = false; obj.phoneno = "Enter a valid Phone No"; } else if (data.phoneno.length < 10) { val = false; obj.phoneno = "Phone number length should be at least 10 digits"; } if (!data.confirmpass.trim()) { val = false; obj.confirmpass = "Enter a valid confirm password"; } else if (data.password !== data.confirmpass) { val = false; obj.confirmpass = "Confirm password does not match the password"; } setError(obj); return val; } useEffect(() => { if (signupSuccess) { alert("signup successful") navigate("/") dispatch(resetSignupState()) } }, [signupSuccess, navigate, dispatch]); return (<div className="min-h-screen flex items-center justify-center p-6 bg-[#a9bafc]"> <div className="relative w-full max-w-6xl bg-white rounded-[32px] shadow-xl overflow-hidden grid md:grid-cols-2"> {/* Left Section */} <div className="p-10 relative z-10"> <div className="flex justify-between items-center text-sm text-gray-500"> <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900"> ← </button> <p> Already member?{" "} <Link to="/" className="text-blue-600 hover:underline"> Sign in </Link> </p> </div> <h2 className="text-4xl font-extrabold mt-8">Sign Up</h2> <p className="text-gray-400 text-sm mt-1"> Secure Your Communications with Easymail </p> {/* Form */} <form onSubmit={handlesubmit} className="mt-10 space-y-6"> {/* Name */} <div className="flex items-center gap-3 border-b border-gray-300"> <User className="h-4 w-4 text-gray-400" /> <input type="text" placeholder="Full Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="w-full py-3 outline-none placeholder-gray-400" /> {data.name && <CheckCircle2 className="h-4 w-4 text-emerald-500" />} </div> {error.name && <p className="text-red-500 text-xs">{error.name}</p>} {/* Email */} <div className="flex items-center gap-3 border-b border-gray-300"> <Mail className="h-4 w-4 text-gray-400" /> <input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="w-full py-3 outline-none placeholder-gray-400" /> {data.email && <CheckCircle2 className="h-4 w-4 text-emerald-500" />} </div> {error.email && <p className="text-red-500 text-xs">{error.email}</p>} {/* Phone */} <input type="number" placeholder="Phone Number" value={data.phoneno} onChange={(e) => setData({ ...data, phoneno: e.target.value })} className="w-full px-2 py-3 border-b border-gray-300 outline-none placeholder-gray-400" /> {error.phoneno && <p className="text-red-500 text-xs">{error.phoneno}</p>} {/* Password */} <div className="flex items-center gap-3 border-b border-gray-300"> <Lock className="h-4 w-4 text-gray-400" /> <input type="password" placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} className="w-full py-3 outline-none placeholder-gray-400" /> <Eye className="h-4 w-4 text-gray-400" /> </div> {error.password && <p className="text-red-500 text-xs">{error.password}</p>} <ul className="mt-2 text-xs space-y-1"> <li className="text-gray-500">Least 8 characters</li> <li className="text-emerald-600">Least one number (0–9) or a symbol</li> <li className="text-emerald-600">Lowercase (a–z) and uppercase (A–Z)</li> </ul> {/* Confirm Password */} <div className="flex items-center gap-3 border-b border-gray-300 text-gray-400"> <Lock className="h-4 w-4" /> <input type="password" placeholder="Re-Type Password" value={data.confirmpass} onChange={(e) => setData({ ...data, confirmpass: e.target.value })} className="w-full py-3 outline-none placeholder-gray-400" /> </div> {error.confirmpass && (<p className="text-red-500 text-xs">{error.confirmpass}</p>)} {/* Button */} <div className="flex items-center gap-4 pt-4"> <button type="submit" disabled={loading} className="px-6 py-3 rounded-full text-white font-medium shadow-md hover:shadow-lg transition bg-blue-600" > {loading ? "Signing up..." : "Sign Up"} </button> <span className="text-sm text-gray-500">Or</span> <div className="flex gap-2"> <button className="h-10 w-10 rounded-full bg-gray-100">G</button> <button className="h-10 w-10 rounded-full bg-gray-100">F</button> </div> </div> </form> </div> {/* Right Section */} <div className="relative bg-gradient-to-tr from-blue-400 via-blue-600 to-indigo-900"> {/* Card 1 */} <div className="w-40 h-56 bg-white rounded-3xl shadow-md flex flex-col items-center justify-between p-4 ml-[60px] mt-[55px] "> {/* Top Text */} <div className="w-full text-left"> <p className="text-sm text-orange-400 font-medium">Inbox</p> <h2 className="text-2xl font-bold text-gray-900">176,18</h2> </div> {/* Circle */} <div className="w-12 h-12 bg-[#0d0d1f] text-white rounded-full flex items-center justify-center text-sm font-semibold shadow"> 45 </div> {/* Waves */} <div className="w-full flex justify-center mt-2"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 30" className="w-28 h-8" > <path d="M0,20 C20,10 40,30 60,20 C80,10 100,30 120,20" stroke="#fbbf24" strokeWidth="3" fill="transparent" /> <path d="M0,20 C20,30 40,10 60,20 C80,30 100,10 120,20" stroke="#3b82f6" strokeWidth="3" fill="transparent" /> </svg> </div> </div> {/* Card 2 */} <div className="absolute bottom-39 left-40 bg-white rounded-2xl shadow-lg p-6 w-72"> <div className="h-2 w-16 bg-blue-400 rounded-full mb-3" /> <div className="flex items-start gap-3"> <div className="h-6 w-6 rounded-full bg-blue-600" /> <div> <div className="font-semibold">Your data, your rules</div> <div className="text-xs mt-1 text-gray-500"> Your data belongs to you, and our encryption ensures that </div> </div> </div> </div> </div> </div> </div>); }; export default Signup;