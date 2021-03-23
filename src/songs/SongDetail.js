import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { SongContext } from '../Songs/SongProvider'
import { SectionContext } from '../Sections/SectionProvider'
import { SectionForm } from '../Sections/SectionForm'
import { Document, Page, pdfjs } from 'react-pdf';
import useWindowDimensions from '../Utils/useWindowDim'
import { Grid, IconButton, Paper, Typography, Card, Container, Box, Dialog } from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PageviewIcon from '@material-ui/icons/Pageview';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export const SongDetail = (props) => {

    const classes = useStyles()
    const history = useHistory()

    const songId = props.match.params.songId
    const { height, width } = useWindowDimensions()


    const { singleSong, getSingleSong } = useContext(SongContext)
    const { setSingleSection, getSingleSection, deleteSection } = useContext(SectionContext)
    const [ windowWidth, setWindowWidth ] = useState(0)
    const [ openSectionForm, setOpenSectionForm ] = useState(0)
    const [ sectionEditId, setSectionEditId ] = useState(0)

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageArray, setPageArray] = useState([])

    function onDocumentLoadSuccess({ numPages }) {
      for (let i = 1; i <= numPages; i++) {
        setPageArray(nums => [...nums, i])
      }
      setNumPages(numPages);
    }

    const handleOpenSectionForm = () => {
      setSingleSection({})
      setOpenSectionForm(true)
    }

    const handleEditSectionClick = (id) => {
      setSectionEditId(id)
      getSingleSection(id)
      setOpenSectionForm(true)
    }

    const handleDeleteSectionClick = (id) => {
      deleteSection(id)
        .then(res => {
          getSingleSong(songId)
        })
    }

    useEffect(() => {
      setWindowWidth(window.innerWidth)
      getSingleSong(songId)
    }, [])


    return (
      <Container theme={classes.root}>
        <Dialog open={openSectionForm}>
          <SectionForm setOpenSectionForm={setOpenSectionForm} songId={songId} pageArray={pageArray} sectionEditId={sectionEditId} />
       </Dialog>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} align="center">
          <div>
            <Typography variant="h2">{singleSong.title}</Typography>
            <Typography variant="overline">{singleSong.composer}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} align="center">
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
        <Grid item xs={12} sm={6} align="center">
          <IconButton onClick={() => setOpenSectionForm(!openSectionForm)}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Document file={singleSong.pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} width={width * .4} />
            </Document>
        </Grid>
        <Grid item xs align="center">
          <Typography variant='h4'>Sections:</Typography>
          <Box m={4}>
          <Grid container className={classes.root} spacing={4}>
          {singleSong.song_sections && singleSong.song_sections.map((section) => 
          <Grid item xs key={section.id} style={{minWidth: '200px'}}>
            <Card raised className={classes.root}>
              <Typography>{section.label}</Typography>
                <IconButton onClick={() => history.push(`/section/${section.id}`)}>
                  <PageviewIcon />
                </IconButton>
                <IconButton onClick={() => handleEditSectionClick(section.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteSectionClick(section.id)}>
                   <DeleteForeverIcon />
                </IconButton>
            </Card> 
            </Grid>
          )}
          </Grid>
          </Box>
        </Grid>

      </Grid>
      </Container>
    )
}
