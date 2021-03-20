import React, { useState, useEffect, useRef } from 'react'
import './metronome.scss'


export const Metronome = (props) => {

  let counter = useRef(1)



  let audioContext = null;
  let notesInQueue = [];        
  let currentQuarterNote = 0;
  let lookahead = 25;        
  let scheduleAheadTime = 0.1;  
  let nextNoteTime = 0.0;  

  const [isRunning, setIsRunning] = useState(false)
  const [intervalID, setIntervalID] = useState(0)
  const [progress, setProgress] = useState(0);
  const [drawID, setDrawID] = useState(0)

  const nextNote = () => {
        const secondsPerBeat = 60.0 / props.tempo
        nextNoteTime += secondsPerBeat
    
        currentQuarterNote++
        if (currentQuarterNote === props.beatcount) {
            currentQuarterNote = 0
        }
    }

  const scheduleNote = (beatNumber, time) => {
        notesInQueue.push({ note: beatNumber, time: time })
        const osc = audioContext.createOscillator()
        const envelope = audioContext.createGain()
        osc.frequency.value = (beatNumber % props.beatcount === 0) ? 1000 : 800
        envelope.gain.value = 1
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001)
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02)
        osc.connect(envelope)
        envelope.connect(audioContext.destination)
        osc.start(time)
        osc.stop(time + 0.03)
    }

  const scheduler = () => {
      while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
          scheduleNote(currentQuarterNote, nextNoteTime)
          nextNote()
      }
  } 

  const beatlength = 60 / props.tempo
  
  const drawProgress = () => {
      setProgress((prevProgress) => (prevProgress >= props.beatcount ? 1 : prevProgress + 1)); 
    }

  const start = () => {
    if (isRunning) return;

    if (audioContext == null)
    {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    setIsRunning(true)

    currentQuarterNote = 0
    nextNoteTime = audioContext.currentTime + 0.05

    const identifier = setInterval(() => scheduler(), lookahead);
    setIntervalID(identifier)
    setProgress(1)
    const drawcircle = setInterval(drawProgress, beatlength * 1000)
    setDrawID(drawcircle)
  }

  const stop = () => {
        setIsRunning(false)
        clearInterval(intervalID)
        clearInterval(drawID)
  }

  const startStop = () => {
      let doNothing = null
        props.trigger === 1 
          ? start() 
          : props.trigger === 2 
            ? stop() 
            : doNothing = null
    }

  useEffect(() => {
    startStop()
  }, [props.trigger])

  
  return (
    <div className={props.trigger === 1 ? 'container d-flex w-50 visible' : 'container d-flex w-50 invisible'}>
        <>
        <div class={progress === 1 ? 'led-blue' : 'led-red'}></div>
        <div class={progress === 2 ? 'led-blue' : 'led-red'}></div>
        { props.beatcount > 2 && <div class={progress === 3 ? 'led-blue' : 'led-red'}></div> }
        { props.beatcount > 3 && <div class={progress === 4 ? 'led-blue' : 'led-red'}></div> }
        { props.beatcount > 4 && <div class={progress === 5 ? 'led-blue' : 'led-red'}></div> }
        { props.beatcount > 5 && <div class={progress === 6 ? 'led-blue' : 'led-red'}></div> }
        { props.beatcount > 6 && <div class={progress === 7 ? 'led-blue' : 'led-red'}></div> }
        { props.beatcount > 7 && <div class={progress === 8 ? 'led-blue' : 'led-red'}></div> }
        { props.beatcount > 8 && <div class={progress === 9 ? 'led-blue' : 'led-red'}></div> }
        { props.beatcount > 9 && <div class={progress === 10 ? 'led-blue' : 'led-red'}></div> }
        { props.beatcount > 10 && <div class={progress === 11 ? 'led-blue' : 'led-red'}></div> }
        { props.beatcount > 11 && <div class={progress === 12 ? 'led-blue' : 'led-red'}></div> }
        </>
    </div>

  )
}
