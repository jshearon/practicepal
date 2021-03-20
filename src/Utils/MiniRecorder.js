import React, { useEffect } from "react";
import useRecorder from "./useRecorder";

export const MiniRecorder = (props) => {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  useEffect(() => {
    let doNothing = null
    props.trigger === 1 ? startRecording() : props.trigger === 2 ? stopRecording() : doNothing = null
  }, [props.trigger])

  return (
    <div className={props.trigger === 2 ? 'MiniRecorder visible' : 'MiniRecorder invisible'}>
        <audio src={audioURL} controls />
    </div>
  );
}
