import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { SongContext } from '../Songs/SongProvider'
import { Document, Page, pdfjs } from 'react-pdf';
import useWindowDimensions from '../Utils/useWindowDim'
import { Grid, Button, IconButton, Paper, Typography, Card, Container } from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MicIcon from '@material-ui/icons/Mic';
import PauseIcon from '@material-ui/icons/Pause';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Draggable from 'react-draggable';
import { SectionList } from '../Sections/SectionList';
import PageviewIcon from '@material-ui/icons/Pageview';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
  },
  card: {
    width: '50%'
  }
}));

export const SongDetail = (props) => {

    const classes = useStyles()
    const history = useHistory()

    const songId = props.match.params.songId
    const { height, width } = useWindowDimensions()


    const { singleSong, getSingleSong } = useContext(SongContext)
    const [trigger, setTrigger] = useState(0)
    const [windowWidth, setWindowWidth ] = useState(0)

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    useEffect(() => {
      setWindowWidth(window.innerWidth)
      getSingleSong(songId)
    }, [])

    const handleRate = (e) => {
      
    }


    return (
      <Container>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} align="center">
          <div>
            <Typography variant="h2">{singleSong.title}</Typography>
            <Typography variant="overline">{singleSong.composer}</Typography>
          </div>
        </Grid>
        <Grid item xs={10} sm={5} align="center">
            <Paper elevation={8} style={{width: width * .4}}>
              <Grid container>
                <Grid item xs={1} className='d-flex justify-content-center align-items-center'>
                  <IconButton onClick={() => pageNumber !== 1 && setPageNumber(pageNumber - 1)}><ArrowLeftIcon /></IconButton>
                </Grid>
                <Grid item xs className='d-flex flex-column justify-content-around align-items-center'>
                  <div className='d-flex justify-content-between'>
                    <h6>Page {pageNumber} of {numPages}</h6>
                  </div>
                </Grid>
                <Grid item xs={1} className='d-flex justify-content-center align-items-center'>
                  <IconButton onClick={() => pageNumber !== numPages && setPageNumber(pageNumber + 1)}><ArrowRightIcon /></IconButton>
                </Grid>
              </Grid>
            </Paper>
        </Grid>    
        <Grid item xs={10} sm={5}></Grid>
        <Grid item xs={10} sm={5}>
            <Document file={singleSong.pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} width={width * .3} />
            </Document>
        </Grid>
        <Grid item xs align="center">
          <Typography variant='subtitle1'>Sections:</Typography>
          {singleSong.song_sections && singleSong.song_sections.map((section) => 
            <Card>
              <Typography>{section.label}</Typography>
                <IconButton onClick={() => history.push(`/section/${section.id}`)}>
                  <PageviewIcon />
                </IconButton>
            </Card> 

          )}
        </Grid>

      </Grid>
      </Container>
    )
}
