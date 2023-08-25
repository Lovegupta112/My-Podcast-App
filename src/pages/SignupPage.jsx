import React, { useState } from "react";
import Header from '../components/Header';
import SingupForm from "../components/Signup-Login/SignupForm";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

    const navigate = useNavigate();


    return (
        <>
            <Header />
            <div className='input-container'>
                <SingupForm />
                <p className="signup-login" onClick={() => navigate('/login')}>Alreay have a account ? Login</p>
            </div>
        </>
    )
}

export default SignupPage;