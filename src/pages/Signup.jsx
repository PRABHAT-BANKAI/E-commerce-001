import React, { useState } from 'react'
import { Link } from 'react-router'

const Signup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "", confirmpass: "", phoneno: "" })
  const [error, setError] = useState({})
  const [submit, setSubmitData] = useState(null)
  
 
  function handlesubmit(e) {
    e.preventDefault()

    if (handleError()) {
      
      setSubmitData(data)
   
      setData({ name: "", email: "", password: "", confirmpass: "", phoneno: "" })
    }
  }
  function handleError() {
    let obj = {}
    let val = true

    if (!data.name.trim()) {
      val = false
      obj.name = "Enter a valid name"

    }

    if (!data.email.trim()) {
      val = false
      obj.email = "Enter a valid email"
    }

    if (!data.password.trim()) {
      val = false
      obj.password = "Enter a valid password"
    }
    if (!data.phoneno.trim()) {
      val = false
      obj.phoneno = "Enter a valid Phone No"
    }
     if (!data.phoneno > 9) {
      val = false
      obj.phoneno = "password length should be grater then 10"
    }

    if (!data.confirmpass.trim()) {
      val = false

      obj.confirmpass = "Enter a valid confirm password"
    }
    if(data.password !== data.confirmpass){
      val = false
     obj.confirmpass = "Confirm password does not match the password";

    }
    setError(obj)
    return val
  }

  return (

    <div className='w-[100vw] h-[100vh] flex justify-center items-center' id='signup'>
      <form className=' border-black border-[2px] rounded-[25px] w-[500px] h-[600px] flex flex-col  items-center' id='signupform' action="" onSubmit={handlesubmit}>

        <h2 className='text-[22px] font-medium mt-[18px] text-black'>CREATE ACCOUNT</h2>
        <label htmlFor="" className='w-[60%]  h-[40px] flex justify-center mt-[30px]' id='name'>
          <input className='w-[100%] pl-[20px]   text-black' type="text" placeholder='Enter Your Full Name' value={data.name} onChange={(e) => {
            setData({ ...data, name: e.target.value })
          }} />
        </label>
        {error.name && <p style={{ color: "red" }}>{error.name}</p>}
        <label htmlFor="" id='email' className='w-[60%]  h-[40px] flex justify-center mt-[30px]'>
          <input className='w-[100%] pl-[20px]  text-black' placeholder='Enter Your E-mail' type="email" value={data.email} onChange={(e) => {
            setData({ ...data, email: e.target.value })
          }} />
        </label>
        {error.email && <p style={{ color: "red" }}>{error.email}</p>}
        <label htmlFor="" className='w-[60%]  h-[40px] flex justify-center mt-[30px]'>
          <input type="number" id='number' placeholder='Enter Your Phone No' value={data.phoneno} className=' w-[100%] pl-[20px]  text-black' onChange={(e) => {
            setData({ ...data, phoneno: e.target.value })
          }} />
        </label>
        {error.phoneno && <p style={{ color: "red" }}>{error.phoneno}</p>}

        <label htmlFor="" name="radio" className='mt-[30px]  w-[60%] h-[40px] flex justify-center items-center relative  text-black'>
          <p className='absolute left-[15px] font-medium text-[17px]'>Gender  :-</p>  <input type="radio" className='w-[20px] absolute right-[180px] h-[15px] border' name='radio' required /> <p className='absolute right-[145px]'>Male</p>  <input type="Radio" className='absolute left-[180px] w-[20px] h-[15px] border ' name='radio' /><p className='absolute left-[200px]'>Female</p>
        </label>

        <label htmlFor="" className='w-[60%]  h-[40px] flex justify-center mt-[15px]'>
          <input id='newPass' className=' w-[100%] pl-[20px]  text-black' type="password" placeholder='Enter Your new Password' value={data.password} onChange={(e) => {
            setData({ ...data, password: e.target.value })
          }} />
        </label>
        {error.password && <p style={{ color: "red" }}>{error.password}</p>}

        <label htmlFor="" className='w-[60%]  h-[40px] flex justify-center mt-[15px]'>
          <input className=' w-[100%] pl-[20px]  text-black' id='conPass' placeholder='Enter Confirm Password' type="password" value={data.confirmpass} onChange={(e) => {
            setData({ ...data, confirmpass: e.target.value })
          }} />
        </label>
        {error.confirmpass && <p style={{ color: "red" }}>{error.confirmpass}</p>}

        <button className='mt-[40px] border w-[250px] h-[40px] rounded-[5px] bg-white cursor-pointer'>submit</button>

        <div className='flex mt-[20px]  text-black'>
          <p>If You Have Already Account ?</p>
       <Link to={"/"}>   <button className='text-blue-600 cursor-pointer'>Login</button></Link>
        </div>
      </form>
      {submit && (
        <div className='ml-[20px]  text-black'>
          <p>Name :-{submit.name}</p>
          <p>Phone No :- {submit.phoneno}</p>    
          <p>E-mail :- {submit.email}</p>
          <p>password :-{submit.password}</p>
        </div>
      )}
    </div>
  )
}

export default Signup