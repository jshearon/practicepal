import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Grid, CircularProgress, Card, CardContent, CardHeader, Button, Box, Paper, Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { SongContext } from '../Songs/SongProvider'
import { SongForm } from './SongForm'
import { Document, Page, pdfjs } from 'react-pdf';
import './Songs.scss'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import PageviewIcon from '@material-ui/icons/Pageview';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const SongList = (props) => {

  const classes = useStyles()

  const history = useHistory()

  const { userSongs, getUserSongs, getSingleSong, setSingleSong } = useContext(SongContext)

  const [pageNumber, setPageNumber] = useState(1);
  const [openSongForm, setOpenSongForm] = useState(false);


  useEffect(() => {
    getUserSongs()
  }, [])

  const handleSongFormClick = () => {
    setOpenSongForm(!openSongForm)
  }

  const handleEditSongFormClick = (id) => {
    getSingleSong(id)
    setOpenSongForm(!openSongForm)
  }

  const handleDeleteSongFormClick = (id) => {
    return fetch(`http://127.0.0.1:8000/songs/${id}`, {
              method: "DELETE",
              headers: {
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
              },
          })
              .then(res => res.json())
              .then(res => {
                getUserSongs()
              })
  }

  return ( 
    <div className={classes.root}>
        <Dialog open={openSongForm} onClose={openSongForm}>
          <SongForm handleSongFormClick={handleSongFormClick} />
       </Dialog>
       <Grid 
          container 
          className={classes.root} 
          spacing={3}
          justify="center"
        >


          <Grid item xs={12} align="center" className="m-3">
            <Typography variant="h4">Works</Typography>
          </Grid>
          <Grid item xs={12} align="center">
                <IconButton onClick={() => {
                  setSingleSong({
                    title: "",
                    composer: "",
                    instrument: "init",
                    pdf: ""
                  })
                  setOpenSongForm(true)}}>
                  <AddCircleIcon fontSize="large" />
                </IconButton>
          </Grid>
          <Grid item xs={12} align="center">
          {
           userSongs.map(song => {
                return (
                <Card key={song.id} raised className={classes.root}>
                  <CardContent>
                        <Typography variant="h4">
                          {song.title}
                        </Typography>
                        <Typography variant="overline">
                          {song.composer}
                        </Typography>
                        <Document file={song.pdf} >
                          <Page pageNumber={1} height={150} />
                        </Document>
                        <IconButton onClick={() => history.push(`/song/${song.id}`)}>
                          <PageviewIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEditSongFormClick(song.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteSongFormClick(song.id)}>
                          <DeleteForeverIcon />
                        </IconButton>
                  </CardContent>
                </Card>
                )
              })
          }
          </Grid>
      </Grid>
    </div>
  )
}
