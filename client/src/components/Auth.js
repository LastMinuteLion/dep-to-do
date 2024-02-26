import { useState } from "react";
import {useCookies} from 'react-cookie'


const Auth = () => {
  const [cookies , setCookie , removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [isLogIn, setLogIn] = useState(true);
  const [email , setEmail] = useState(null)
  const [password , setPassword] = useState(null)
  const [confirmPassword , setConfirmPassword] = useState(null)

  console.log(cookies);

  const viewLogin = (status) => {
    setError(null);
    setLogIn(status);
  };

  const handleSubmit =  async(e , endpoint) => {
    e.preventDefault();
    // Handle form submission here
    if(!isLogIn && password !== confirmPassword){
      setError('Make sure passwords match')
      return
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password})
    })

    const data = await response.json()
    //console.log(data);
   
    if(data.detail){
      setError(data.detail)
    }else{
      setCookie('Email' ,data.email)
      setCookie('AuthToken' , data.token)

      window.location.reload()
    }

  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form onSubmit={handleSubmit}>
          <h2>{isLogIn ? 'Please Log In' : 'Please Sign Up!'}</h2>
          <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)}/>


          {!isLogIn &&
           <input type="password"
           placeholder="Confirm Password"
           onChange={(e) =>setConfirmPassword(e.target.value)}
           />}

          <button type="submit" className="create" onClick={(e) => 
            handleSubmit(e,isLogIn ? 'login' : 'signup')}>
            Submit
          </button>

          {error && <p>{error}</p>}
        </form>

        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{ backgroundColor: !isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)' }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{ backgroundColor: isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)' }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
