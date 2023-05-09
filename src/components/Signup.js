import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let history = useHistory();

    const handleSubmit= async (e)=>{
        e.preventDefault(); //otherwise my page will get reload
        const {name, email, password } = credentials;
        const response = await fetch('http://localhost:5000/api/auth/createuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
                
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken)
            history.push("/");
            props.showAlert("Account created Successfully","success")

        }else{
            // alert("Invalid credentials")
            props.showAlert("Invalid Credentials","danger")
        } 
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container mt-2">
        <h2 className="my-2">Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" onChange={onChange}  id="name" name="name" aria-describedby="emailHelp" placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" onChange={onChange}  id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="password" name="password" minLength={5} required placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" minLength={5} required placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary"  >Submit</button>
            </form>


        </div>
    )
}

export default Signup
