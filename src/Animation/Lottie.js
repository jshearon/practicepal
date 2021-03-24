import React from "react";
import Lottie from "react-lottie";
import metronome from './metronome.json'
import './logo.scss'

export default function MetronomeAnimation({ lotti, width, height }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: metronome,
    renderer: 'svg',
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-25">
      <Lottie options={defaultOptions} width={width} height={height} />
    </div>
  );
};
