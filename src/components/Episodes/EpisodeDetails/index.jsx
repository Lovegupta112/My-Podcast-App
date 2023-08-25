import React from 'react'
import Button from '../../Button.jsx';
import './style.css';

const EpisodeDetails = ({index,title,desc,audioFile,onClick}) => {
    console.log('episode page');
  return (
    <div className='episode-section'>
        <h3>{index}. {title}</h3>
        <p className='desc'>{desc}</p>
        <Button text='Play' onClick={()=>onClick(audioFile)} style={{width:'150px',}}/>
    </div>
  )
}

export default EpisodeDetails;