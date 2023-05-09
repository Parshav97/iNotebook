import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let history = useHistory();

    const handleSubmit= async (e)=>{
        e.preventDefault(); //otherwise my page will get reload
        const response = await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
                
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            // save the auth token
            localStorage.setItem('token',json.authtoken)
            history.push("/");
            // redirect

            props.showAlert("Logged in Successfully","success")

        }else{
            // alert("Invalid credentials")
            props.showAlert("Invalid Details","danger")

        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="mt-3">
        <h2>Login to Continue to iNotebook</h2>
            <form onSubmit={handleSubmit} autoComplete="on">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control"  onChange={onChange} value={credentials.email}  id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control"  onChange={onChange} value={credentials.password} id="password" name="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary"  >Submit</button>
            </form>

        </div>
    )
}

export default Login
