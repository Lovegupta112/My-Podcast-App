import React from 'react'
import './style.css';
const Button = ({text,isDisabled,onClick,style}) => {
  return (
    <button  disabled={isDisabled} className='custom-btn' onClick={onClick} style={style}>{isDisabled?'Loading...':text }</button>
  )
}

export default Button;