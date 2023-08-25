import React ,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth,db} from '../../firebase';
import {doc,getDoc} from 'firebase/firestore'
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import { setUser } from '../../slices/userSlice';
import InputComponent from "../Input";
import Button from "../Button.jsx/index.jsx";


const LoginForm = () => {
    const [loading,setLoading]=useState(false);
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');


const navigate=useNavigate();
const dispatch=useDispatch();


async function loginHandler(){

  console.log('login handling...');
   
    // console.log(loginInfo);
    setLoading(true);

    if(!email || !password){
      toast.error('Please Fill all the Fields !');
      setLoading(false);
      return;
    }
    
    try{
      const userCredential=await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user=userCredential.user;
      console.log("Login user : ",user);
       
      const userDoc=await getDoc(doc(db,"users",user.uid));
      const userData=userDoc.data();
      console.log('userData: ',userData);

     dispatch(setUser({
      name:userData.name,
      email:userData.email,
      uid:userData.uid,
      profileImage:userData. profileImage
     }))
     toast.success('Login SuccessFully !');
     setLoading(false);
     navigate('/profile');    
    }
    catch(error){
      console.log("Error : ",error);
      setLoading(false);
      toast.error(error.message);
    }
  }


  return (
 <>
    <h1>Login</h1>
    <div className='main'>
       <section>
      
          <InputComponent type="email" value={email} placeholder="Enter Your Email" setState={setEmail}/>
       </section>
       <section>
       
          <InputComponent type="password" value={password} placeholder="Enter Your Password" setState={setPassword}/>
       </section>
       <Button  text='Login' isDisabled={loading} onClick={loginHandler}/>
     
    </div>
  </>
  )
}

export default LoginForm;