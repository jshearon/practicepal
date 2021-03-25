import React, { useEffect, useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { SectionContext } from '../Sections/SectionProvider'
import { Metronome } from '../Utils/Metronome'
import { MiniRecorder } from '../Utils/MiniRecorder'
import { Document, Page, pdfjs } from 'react-pdf';
import useWindowDimensions from '../Utils/useWindowDim'
import { Grid, Button, IconButton, Paper, Avatar, Typography } from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MicIcon from '@material-ui/icons/Mic';
import PauseIcon from '@material-ui/icons/Pause';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Draggable from 'react-draggable';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 500,
    position: 'absolute',
    top: '10%',
    right: '10%'
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export const SectionDetail = (props) => {

    const classes = useStyles();
    const sectionId = props.match.params.sectionId
    const { height, width } = useWindowDimensions();


    const { singleSection, getSingleSection, logAttempt } = useContext(SectionContext)
    const [trigger, setTrigger] = useState(0)
    const [windowWidth, setWindowWidth ] = useState(0)

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    useEffect(() => {
      setWindowWidth(window.innerWidth * .90)
      getSingleSection(sectionId)
    }, [])

    const handleRate = (e) => {
      logAttempt({
        section: parseInt(sectionId),
        bpm: singleSection.current_tempo,
        success: e.currentTarget.value === "true" ? true : false
      })
        .then(() => getSingleSection(sectionId))
        .then(() => setTrigger(0))
    }


    return (
      <div>
        {
          singleSection && singleSection.song &&
          <>
          <div className="d-flex justify-content-between align-items-center m-5 flex-wrap">
            <Typography variant='h4'>{singleSection.song.title}</Typography>
            <Typography variant='h2'>{singleSection.label}</Typography>
          </div>
          <div className='d-flex justify-content-center'>
            <Document file={singleSection.song.pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} width={width * .90} />
  
            </Document>
          </div>
          </>
        }
        <Draggable>
          
        <Paper className={classes.paper} elevation={8}>
        <Grid container>
          <Grid item xs={1} className='d-flex justify-content-center align-items-center'>
            <IconButton onClick={() => pageNumber !== 1 && setPageNumber(pageNumber - 1)}><ArrowLeftIcon /></IconButton>
          </Grid>
          <Grid item xs className='d-flex flex-column justify-content-around align-items-center'>
            <h6>Page {pageNumber} of {numPages}</h6>
            <Typography variant='h6'>Current Tempo:</Typography>
              <Avatar style={{backgroundColor: 'orange'}}>
                {singleSection.current_tempo}
              </Avatar>
            <div style={{ minWidth: '250px' }}><Metronome tempo={singleSection.current_tempo} trigger={trigger} beatcount={singleSection.beats} /></div>
            <div><MiniRecorder trigger={trigger} /></div>
            <div className='d-flex justify-content-between w-100'>
              <Button 
                variant='contained' 
                color='primary' 
                startIcon={trigger === 0 ? <MicIcon /> : trigger === 2 ? <MicIcon /> : <PauseIcon />}
                onClick={() => {
                    trigger === 0 ? setTrigger(1) : trigger === 1 ? setTrigger(2) : setTrigger(1)
                  }
                }>
                {trigger === 0 ? 'Attempt' : trigger === 2 ? 'Attempt' : 'Stop'}
              </Button>
              {
                trigger === 2 &&
                <>
                <IconButton value={true} onClick={handleRate}>
                  <ThumbUpIcon />
                </IconButton>
                <IconButton value={false} onClick={handleRate}>
                  <ThumbDownIcon />
                </IconButton>
                </>
              }
            </div>
          </Grid>
          <Grid item xs={1} className='d-flex justify-content-center align-items-center'>
            <IconButton onClick={() => pageNumber !== numPages && setPageNumber(pageNumber + 1)}><ArrowRightIcon /></IconButton>
          </Grid>
        </Grid>
        </Paper>
        </Draggable>
      </div>
    )
}
