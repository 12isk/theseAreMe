import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './styles.module.scss'

export default function MuteButton({soundFile}) {
  const [isMuted, setIsMuted] = useState(true);
  const audioContext = useRef(null);
  const audioBuffer = useRef(null);
  const audioSource = useRef(null);

  useEffect(()=>{
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
  
    const audio = new Audio(soundFile);
    console.log("created Audio", audio)
    audio.loop = true;

    audioSource.current = audio;

  },[]);

  const toggleAudio = (e) => {
    e.preventDefault();
    if (isMuted) {
      if (audioContext.current.state === 'suspended'){
        audioContext.current.resume().then(() => {
          console.log("Sound Activated!");
          audioSource.current.currentTime = 0;
          audioSource.current.play();
        });
      }
      setIsMuted(false);
    }
    else {
      audioContext.current.suspend().then(() => {
        console.log("Sound Deactivated!");
        audioSource.current.pause();
        audioSource.current.currentTime = 0;
      });
      setIsMuted(true);
    }
        
}

  return(
    <div className={styles.muteContainer}>
      <button 
        onClick={toggleAudio}
        className={styles.muteButton}
      >
        {isMuted ? 
          <VolumeX className="w-6 h-6" /> : 
          <Volume2 className="w-6 h-6" />
        }
        
      </button>
      {/* <p className={styles.subtitle}> Sound {isMuted ? "On": "Off"} </p> */}
    </div>
    
  );
}
    
