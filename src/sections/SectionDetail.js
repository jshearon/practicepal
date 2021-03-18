import React, { useEffect, useContext } from 'react'
import { SectionContext } from '../Sections/SectionProvider'
import { Metronome } from '../Utils/Metronome'
import Recorder from '../Utils/Recorder'

export const SectionDetail = (props) => {
    const sectionId = props.match.params.sectionId

    const { singleSection, getSingleSection } = useContext(SectionContext)

    useEffect(() => {
      getSingleSection(sectionId)
    }, [])

    return (
      <div>
        {
          singleSection && singleSection.song &&
            <h1>{singleSection.song.title}</h1>
        }
        <Recorder />
        <Metronome tempo="150" />
      </div>
    )
}
