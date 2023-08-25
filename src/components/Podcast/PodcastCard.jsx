import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

const PodcastCard = ({id,title,displayImage}) => {
  return (
   <NavLink to={`/podcast/${id}`}>
    <div className='podcastCard'>
       <div className="image">
        <img src={displayImage} alt="title" />
       </div>
      <div className='podcastCard-info'>
      <p>{title}</p>
      </div>
    </div>
    </NavLink>
  )
}

export default PodcastCard;