import React , { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils';

function Login() {

  
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (e)=>{
      const { name,  value}  = e.target;
      console.log(name, value);
      const copyLoginInfo = { ...loginInfo};
      copyLoginInfo[name] = value;
      setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    const {email, password} = loginInfo;
    if ( !email || !password){
      return handleError('Email and password are required')
    }
    try{
      const url = `${process.env.REACT_APP_API_URL}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message,jwtToken, name, error } = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() =>{
           navigate('/home')
        }, 1000)
      }else if(error){
          const details = error?.details[0].message;
          handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result);
    }catch(err){
       handleError(err);
    }
  }
  return (
    <div className="container">
      <div className="left-section">
        <img 
          src="https://cdn.prod.website-files.com/5d66bdc65e51a0d114d15891/64cebc6c19c2fe31de94c78e_X-vector-logo-download.png"
          alt="X logo"
          className="x-logo"
        />
      </div>

      <div className="right-section">
        <h1 className="happening-now">Happening now.</h1>
        <div className="login-box">
          <h2 className="join-today">Join today.</h2>

          <form className="login-form" onSubmit={handleLogin}>
            <input onChange={handleChange} type="email" name="email" placeholder="Enter your email..." value={loginInfo.email}/>
            <input onChange={handleChange} type="password" name="password" placeholder="Enter your password..." value={loginInfo.password} />
            <button className="button">Login</button>
          </form>

          <span>
            Don't have an account? <Link to="/signup">Signup</Link>
          </span>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default Login;
