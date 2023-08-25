import React from 'react'
import { NavLink } from 'react-router-dom';
import './style.css';

const Header = () => {
  return (
    <header>
      <div className="gradient"></div>
      <nav>
        <NavLink to='/'>Signup</NavLink>
        <NavLink to='/podcasts'>Podcasts</NavLink>
        <NavLink to='/create-a-podcast'>Start A Podcast</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
      </nav>
    </header>
  )
}

export default Header;