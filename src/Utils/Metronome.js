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
        if (currentQuarterNote === 4) {
            currentQuarterNote = 0
        }
    }

    useEffect(() => {
      //window.requestAnimationFrame(draw)
    }, [])

  const scheduleNote = (beatNumber, time) => {
        notesInQueue.push({ note: beatNumber, time: time })
        const osc = audioContext.createOscillator()
        const envelope = audioContext.createGain()
        osc.frequency.value = (beatNumber % 4 === 0) ? 1000 : 800
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
  const beatcount = 4

  const drawProgress = () => {
      setProgress((prevProgress) => (prevProgress >= beatcount ? 1 : prevProgress + 1)); 
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

  useEffect(() =>{

  }, [])
  
  return (
    <div class="container d-flex w-50">
        <div class={progress === 1 ? 'led-blue' : 'led-red'}></div>
        <div class={progress === 2 ? 'led-blue' : 'led-red'}></div>
        <div class={progress === 3 ? 'led-blue' : 'led-red'}></div>
        <div class={progress === 4 ? 'led-blue' : 'led-red'}></div>
    </div>

  )
}
