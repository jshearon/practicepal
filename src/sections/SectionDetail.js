import React, { useEffect, useContext, useState } from 'react'
import { SectionContext } from '../Sections/SectionProvider'
import { Metronome } from '../Utils/Metronome'
import Recorder from '../Utils/Recorder'

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
        <Recorder trigger={trigger} />
        <Metronome tempo="150" trigger={trigger} />
        <button onClick={() => {
          trigger === 0 ? setTrigger(1) : trigger === 1 ? setTrigger(2) : setTrigger(1)
          }
        }>
          {trigger === 0 ? 'Start' : trigger === 2 ? 'Start' : 'Stop'}
        </button>
      </div>
    )
}
