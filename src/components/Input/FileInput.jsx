import React, { useState } from 'react';
import './style.css';


const FileInput = ({accept,id,placeholder,fileHandler}) => {

const [selectedFile,setSelectedFile]=useState('');

    function changeHandler(e){
       console.log(e.target.files);
       setSelectedFile(e.target.files[0].name);
       fileHandler(e.target.files[0]);
    }

  return (
    <>
    <label htmlFor={id} className={`custom-input ${selectedFile?'active-input':'label-input'}`}>{selectedFile?` ${selectedFile} Selected `:placeholder}</label>
    <input type="file" accept={accept} id={id} 
    style={{display:'none'}} onChange={changeHandler}/>
    </>
  )
}

export default FileInput;