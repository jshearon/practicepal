import React, { Component, useState } from 'react'
 
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
 
class Recorder extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      recordState: null,
      blobURL: null
    }
  }
 
  start = () => {
    this.setState({
      recordState: RecordState.START
    })
  }
 
  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    })
  }
 
  //audioData contains blob and blobUrl
  onStop = (audioData) => {
    const url = URL.createObjectURL(audioData.blob)
    this.setState({
      blobURL: url
    })
  }

  componentDidUpdate(prevProps, prevState) {
    let doNothing = null
    if (prevProps.trigger !== this.props.trigger) {
      this.props.trigger === 1 ? this.start() : this.props.trigger === 2 ? this.stop() : doNothing = null
    }
  }
 
  render() {
    const { recordState } = this.state
    const { blobURL } = this.state
 
    return (
      <div>
        <AudioReactRecorder 
          state={recordState} 
          onStop={this.onStop} 
          type='audio/mp3'
          backgroundColor='rgb(48,48,48)' 
          foregroundColor='rgb(200,200,200)'
          canvasWidth='200'
          canvasHeight='100' />
 
        <audio controls="controls" src={blobURL} type="audio/mp3" />
      </div>
    )
  }
}

export default Recorder;
