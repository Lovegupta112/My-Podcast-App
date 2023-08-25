import React ,{useState} from "react";
import Header from '../components/Header';

import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Signup-Login/LoginForm";

const LoginPage=()=>{

    const navigate=useNavigate();

    return (
        <>
        <Header />
         <div className='input-container'>
          <LoginForm />
          <p className="signup-login" onClick={()=>navigate('/')}>Don't have an account? Signup</p>
         </div>
        </>
    )
}

export default LoginPage;