import axios from 'axios'
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
        <div>
            <input className='border ' type="text" placeholder='Enter Your Email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

            <br />
            {vboolean ? (
                <div>
                    <form action="" onSubmit={handleSubmit}>
                       
                        <br />
                        <label >
                            <input className='border' type="text" placeholder='Enter your New Password' value={cdata.password} onChange={(e) => setCdata({ ...cdata, password: e.target.value })} />
                        </label>
                        {error.password && <p style={{ color: "red" }}>{error.password}</p>}
                        <br />
                        <label >
                            <input className='border' type="text" placeholder='Enter confirm password' value={cdata.confirmpass} onChange={(e) => setCdata({ ...cdata, confirmpass: e.target.value })} />
                        </label>
                        {error.confirmpass && (
                            <p style={{ color: "red" }}>{error.confirmpass}</p>
                        )}
                        <button>submit</button>
                    </form>
                </div>
            ) : (<button onClick={handleVerify}>Verify Email</button>)}
        </div>
    )
}

export default Forgotpassword