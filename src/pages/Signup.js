import React , {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils';

function Signup({ setIsAuthenticated }) {

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const handleChange = (e)=>{
      const { name,  value}  = e.target;
      console.log(name, value);
      const copySignupInfo = { ...signupInfo};
      copySignupInfo[name] = value;
      setSignupInfo(copySignupInfo);
  }
  console.log('loginInfo -> ', signupInfo);
  const handleSignup = async (e)=>{
    e.preventDefault();
    const {name, email, password} = signupInfo;
    if (!name || !email || !password){
      return handleError('Name, email and password are required')
    }
    try{
      const url = `${process.env.REACT_APP_API_URL}/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message, error } = result;
      if(success){
        handleSuccess(message);
        setIsAuthenticated(true);
        localStorage.setItem("loggedInUser", name);
        navigate('/home');
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
  };
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
        <div className="signup-box">
          <h2 className="join-today">Join today.</h2>

          <form className="signup-form" onSubmit={handleSignup}>
            <input onChange = {handleChange} type="text" name="name" placeholder="Enter your name..." value={signupInfo.name} />
            <input onChange = {handleChange} type="email" name="email" placeholder="Enter your email..." value={signupInfo.email}/>
            <input onChange = {handleChange} type="password" name="password" placeholder="Enter your password..." value={signupInfo.password} />
            <button className="button" type='submit'>Sign Up</button>
          </form>

          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default Signup;
