import React ,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import {auth, db, storage} from '../../../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import FileInput from '../../Input/FileInput';
import InputComponent from '../../Input';
import Button from '../../Button.jsx/index.jsx';
import { addDoc, collection, doc } from 'firebase/firestore';

const CreatePodcastForm = () => {


const [title,setTitle]=useState('');
const [desc,setDesc]=useState('');
const [displayImage,setDisplayImage]=useState();
const [bannerImage,setBannerImage]=useState();
const [loading,setLoading]=useState(false);


const navigate=useNavigate();

 async function handleSubmit(e){
   e.preventDefault();
   setLoading(true);
   
   //will show message if user doesnt fill or forgets any field
  if(!title || !desc || !displayImage || !bannerImage ){
    toast.error('Please Fill All the Fields !');
    setLoading(false);
    return;
  }
  
  //1-we will create image ref and upload files---
 try{
  const bannerImageRef=ref(storage,`podcast/${auth.currentUser.uid}/${Date.now()}`);
  await uploadBytes(bannerImageRef,bannerImage);
  const displayImageRef=ref(storage,`podcast/${auth.currentUser.uid}/${Date.now()}`);
  await uploadBytes(displayImageRef,displayImage);

  
  //2-we will get downloadable links-----
  
  const bannerImageUrl=await getDownloadURL(bannerImageRef);
  const displayImageUrl=await getDownloadURL(displayImageRef);

    //make new collection for podcasts in firestore database--
    const podcastData={
      title,
      desc,
      bannerImage:bannerImageUrl,
      displayImage:displayImageUrl,
      createdBy:auth.currentUser.uid
    }

    const docRef=addDoc(collection(db,'podcasts'),podcastData);
      setTitle('');
      setDesc('');
      setDisplayImage();
      setBannerImage();  
      navigate('/podcasts');
   
    toast.success('Successfully podcast created !');
  setLoading(false);
 }
 catch(error){
  console.log(error);
   toast.error(error.message);
   setLoading(false);
 }
 }

 function bannerImageHandler(file){
  setBannerImage(file);
 }

 function displayImageHandler(file){
  setDisplayImage(file);
 }

  return (

  <div className='main' >
    <section>
  <InputComponent type="text" placeholder='Enter Title' value={title} setState={setTitle}/>    
    </section>
    <section>
       <InputComponent type="text" placeholder='Enter Description' value={desc} setState={setDesc} />
    </section>
    <section>
      <FileInput accept='images/+' id='display-image' placeholder='Upload Display Image' fileHandler={displayImageHandler}/>
    </section>
    <section>
      <FileInput accept='images/+' id='banner-image' placeholder='Upload Banner Image' fileHandler={bannerImageHandler}/>
    </section>

    <Button  text={'Create Podcast'} isDisabled={loading} onClick={handleSubmit} />
  </div>
  )
}

export default CreatePodcastForm;