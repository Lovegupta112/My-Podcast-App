import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AudioPlayer = ({ audioSrc, image }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMute, setIsMute] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);

    const audioRef = useRef();

    function handleDuration(e) {
        setCurrentTime(e.target.value);
        audioRef.current.currentTime = e.target.value;
    }

    function toogleMode() {
        if (isPlaying) {
            setIsPlaying(false);
        }
        else {
            setIsPlaying(true);
        }
    }

    function toogleMute() {
        if (isMute) {
            setIsMute(false);
        }
        else {
            setIsMute(true);
        }
    }

    function handleVolume(e) {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    }

    // useEffect(() => {
         
    //     setDuration(audioRef.current.duration);
    //     }, [audioRef])
    
    
    useEffect(() => {

        const audio = audioRef.current;
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetaData);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetaData);
            audio.addEventListener('ended', handleEnded);

        }
    }, [])

    function handleTimeUpdate() {
        setCurrentTime(audioRef.current.currentTime);
    }

    function handleLoadedMetaData() {
        setDuration(audioRef.current.duration);
    }

    function handleEnded() {
        setCurrentTime(0);
        setIsPlaying(false);
    }

    // useEffect for playing and pausing the audio
    useEffect(() => {

        if (isPlaying) {
            audioRef.current.play();
        }
        else {
            audioRef.current.pause();
        }

    }, [isPlaying])

    // useEffect for muting and unmuting  the audio
    useEffect(() => {
        if (isMute) {
            audioRef.current.volume = 1;
            setVolume(1);
        }
        else {
            audioRef.current.volume = 0;
            setVolume(0);
        }
    }, [isMute]);

    function formatTime(time){
        const min=Math.floor(time/60);
        const sec=Math.floor(time%60);
        return `${min}:${sec<10 ?'0':''}${sec}`;
    }

    return (
        <div className='custom-audio-player'>
            <div className="image">
                <img src={image} alt="" />
            </div>
            <audio ref={audioRef} src={audioSrc} />
            <p onClick={toogleMode}  className='audio-btn'>{isPlaying ? <FaPause /> : <FaPlay />}</p>
            <div className="duration-container">
                <span className='duration-time'>{formatTime(currentTime)}</span>
                <input type="range" onChange={handleDuration} className='duration-range'  max={duration} value={currentTime} />
                <span className='duration-time'>-{formatTime(duration-currentTime)}</span>
            </div>
            <p onClick={toogleMute} className='audio-btn'>{isMute ? <FaVolumeUp /> : <FaVolumeMute />}</p>
            <input type="range" max={1} min={0} step={0.1} value={volume} onChange={handleVolume} className='volume-range' />
        </div>
    )
}

export default AudioPlayer;