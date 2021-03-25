import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Typography, Grid, CircularProgress, Card, CardContent, CardHeader, Button, Box, Paper, Dialog } from '@material-ui/core'
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
    margin: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
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
            setOpenSongForm(true)
          }}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={12} align="center">
          <Grid container justify='space-around'>
            {
              userSongs.map(song => {
                return (
                  <Grid item xs={12} sm={4}>
                    <Paper variant='elevation' elevation={10} className={classes.paper}>
                      <Grid container direction='column' spacing={3}>
                        <Grid item xs align="left">
                          <Typography variant="h4">
                            {song.title}
                          </Typography>
                        </Grid>
                        <Grid item xs align="left">
                          <Typography variant="overline">
                            {song.composer}
                          </Typography>
                        </Grid>
                        <Grid item xs align="center">
                          <Document file={song.pdf} >
                            <Page pageNumber={1} height={150} />
                          </Document>
                        </Grid>
                        <Grid item xs>
                          <Grid container justify='space-around'>
                            <Grid item>
                              <IconButton onClick={() => history.push(`/song/${song.id}`)}>
                                <PageviewIcon />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton onClick={() => handleEditSongFormClick(song.id)}>
                                <EditIcon />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton onClick={() => handleDeleteSongFormClick(song.id)}>
                                <DeleteForeverIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
