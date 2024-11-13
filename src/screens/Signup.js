import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", phone: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.phone.length !== 10) {
            alert("Please enter a 10-digit phone number");
            return;
        }
        const response = await fetch("http://localhost:8080/api/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, phone: credentials.phone })
        });
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("This Email or Phone number have been used")
        }
        else {
            alert("Success !")
            navigate("/login");
        }
    }
    const onChange = (event) => {
        const { name, value } = event.target;
        if (name === 'phone' && isNaN(value)) {
            alert("Phone number must be numeric");
            return;
        }
        setcredentials({ ...credentials, [name]: value });
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Username</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby='emailHelp' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" aria-describedby='emailHelp' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Phone Number</label>
                        <input type="number" className="form-control" name='phone' value={credentials.phone} onChange={onChange} id="exampleInputPassword1" aria-describedby='emailHelp' />
                    </div>

                    <button type="submit" className="mt-3 btn btn-success">Submit</button>

                    <div className="mb-3">
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Already have a user ?  .  .  .</label>
                        <div>
                            <Link to="/login" className='mt-3 btn btn-danger'>SignIn</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
