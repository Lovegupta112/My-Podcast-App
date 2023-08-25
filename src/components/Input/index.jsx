import React from 'react';
import './style.css';

const InputComponent = ({type,placeholder,value,setState}) => {

  return (
    < input type={type} 
    value={value}  
    placeholder={placeholder}
    onChange={(e)=>setState(e.target.value)}
    className='custom-input'
    />
  )
}

export default InputComponent;