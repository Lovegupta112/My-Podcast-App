import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '../../slices/userSlice';

import InputComponent from "../Input";
import Button from "../Button.jsx/index.jsx";
import FileInput from "../Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [profileImage, setProfileImage] = useState();


  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function signupHandler() {
    console.log('Handling Signup...');
    setLoading(true);

    if (!name || !email || !password || !cnfPassword || !profileImage) {
      // alert('Please Fill all the Fields !');
      toast.error('Please Fill all the Fields !');
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      // alert('There must be atleast 6  Character');
      toast.error('Password must have atleast 8  Character');
      setLoading(false);
      return;
    }
    if (password !== cnfPassword) {
      // alert('Password dont match !');
      toast.error('Password dont match !');
      setLoading(false);
      return;
    }

    try {
      //creating user's Account--
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user: ", user);

      //creating profile in storage and will store ------
      const profileImageRef = ref(storage, `profile/${user.uid}`);
      await uploadBytes(profileImageRef, profileImage);

      //  //now we will take downloadable link of image -----

      const profileImageUrl = await getDownloadURL(profileImageRef);

      //saving user's details in firestore database--
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
        profileImage: profileImageUrl
      })

      //saving data into redux and calling action 
      dispatch(setUser({
        name,
        email,
        uid: user.uid,
        profileImage: profileImageUrl
      }))

      toast.success('User has been Created SuccessFully!');
      setLoading(false);
      navigate('/profile');
    }
    catch (error) {
      console.log('Error: ', error);
      toast.error(error.message);
      setLoading(false);
    }
  }

  function profileImageHandler(file) {
    setProfileImage(file);
  }

  return (
    <>
      <h1>Signup</h1>
      <div className='main' >
        <section>
          {/* <input type="text" value={signupInfo.name}  placeholder="Enter Your Name"
         onChange={(e)=>setSignupInfo({...signupInfo,name:e.target.value})}/> */}
          <InputComponent type="text" value={name} placeholder="Enter Your Name" setState={setName} />
        </section>
        <section>
          <InputComponent type="email" value={email} placeholder="Enter Your Email" setState={setEmail} />
        </section>

        <section>
          <FileInput accept='images/+' id='profile-image' placeholder='Upload Profile Image' fileHandler={profileImageHandler} />
        </section>
        <section>
          <InputComponent type="password" value={password} placeholder="Enter Your Password" setState={setPassword} />
        </section>
        <section>
          <InputComponent type="password" value={cnfPassword} placeholder="Confirm Password" setState={setCnfPassword} />
        </section>

        <Button text='Signup' isDisabled={loading} onClick={signupHandler} />

      </div>
    </>
  )
}

export default SignupForm;