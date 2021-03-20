import React, { useEffect, useContext, useState, useRef } from 'react'
import { SectionContext } from '../Sections/SectionProvider'
import { Metronome } from '../Utils/Metronome'
import { MiniRecorder } from '../Utils/MiniRecorder'
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const SectionDetail = (props) => {
    const sectionId = props.match.params.sectionId

    const { singleSection, getSingleSection } = useContext(SectionContext)
    const [trigger, setTrigger] = useState(0)
    const [windowWidth, setWindowWidth ] = useState(0)

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    useEffect(() => {
      setWindowWidth(window.innerWidth * .50)
      getSingleSection(sectionId)
    }, [])


    return (
      <div>
        {
          singleSection && singleSection.song &&
          <>
            <h1>{singleSection.song.title}</h1>
            <Document file={singleSection.song.pdf} >
                <Page pageNumber={1} width={windowWidth} />
            </Document>
          </>
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
