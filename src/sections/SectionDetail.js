import React, { useEffect, useContext, useState } from 'react'
import { SectionContext } from '../Sections/SectionProvider'
import { Metronome } from '../Utils/Metronome'
import { MiniRecorder } from '../Utils/MiniRecorder'

export const SectionDetail = (props) => {
    const sectionId = props.match.params.sectionId

    const { singleSection, getSingleSection } = useContext(SectionContext)
    const [trigger, setTrigger] = useState(0)

    useEffect(() => {
      getSingleSection(sectionId)
    }, [])

    return (
      <div>
        {
          singleSection && singleSection.song &&
            <h1>{singleSection.song.title}</h1>
        }
        <MiniRecorder trigger={trigger} />
        <Metronome tempo="120" trigger={trigger} beatcount="4" />
        <button onClick={() => {
          trigger === 0 ? setTrigger(1) : trigger === 1 ? setTrigger(2) : setTrigger(1)
          }
        }>
          {trigger === 0 ? 'Start' : trigger === 2 ? 'Start' : 'Stop'}
        </button>
      </div>
    )
}
