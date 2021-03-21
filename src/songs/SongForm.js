import React, { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"
import { TextField, Button, Typography, Grid, IconButton, Select, MenuItem } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import "../Auth/Auth.scss"
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Document, Page, pdfjs } from 'react-pdf';
import { SongContext } from '../Songs/SongProvider'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

export const SongForm = (props) => {

  const { instruments, getInstruments, getUserSongs, singleSong } = useContext(SongContext)

  let history = useHistory();

  const classes = useStyles();

  const initialFormData = Object.freeze({
    title: "",
    composer: "",
    instrument: "init",
  });

  const [formData, setFormData] = useState(initialFormData);
  const [formPdf, setFormPdf] = useState();
  const [previewPdf, setPreviewPdf] = useState();

  useEffect(() => {
    setFormData({
      title: singleSong.title,
      composer: singleSong.composer,
      instrument: singleSong.instrument && singleSong.instrument.id
    })
    singleSong.pdf && fetch(singleSong.pdf, {
      method: "GET",
      headers: {
        "Authorization": `Token ${localStorage.getItem("pp_token")}`
      }
    })
    .then(res => res && res.blob())
    .then(res => {
      res && 
      setFormPdf(res)
      setPreviewPdf(URL.createObjectURL(res))
    })
  }, [singleSong])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleInstrument = (e) => {
    setFormData({
      ...formData,
      instrument: e.target.value
    });
  };


  const handlePdf = (e) => {
    if (e.target.files && e.target.files[0]) {
      let pdf = e.target.files[0];
      setFormPdf(pdf)
      setPreviewPdf(URL.createObjectURL(pdf))
    } 
  }

  const handleNewSong = (e) => {
      e.preventDefault()

      const formEnc  = new FormData();

      for(const key in formData) {
        formEnc.append(key, formData[key]);
      }

      formEnc.append('pdf', formPdf)

          return fetch("http://127.0.0.1:8000/songs", {
              method: "POST",
              headers: {
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
              },
              body: formEnc
          })
              .then(res => res.json())
              .then(res => {
                getUserSongs()
                props.handleSongFormClick()
              })
  }

  const handleUpdateSong = (e) => {
    e.preventDefault()

    const formEnc  = new FormData();

    for(const key in formData) {
      formEnc.append(key, formData[key]);
    }

    formEnc.append('pdf', formPdf)

        return fetch(`http://127.0.0.1:8000/songs/${singleSong.id}`, {
            method: "PUT",
            headers: {
              "Authorization": `Token ${localStorage.getItem("pp_token")}`
            },
            body: formEnc
        })
            .then(res => {
              getUserSongs()
              props.handleSongFormClick()
            })
}

  useEffect(() => {
    getInstruments()
  }, [])

    return (
      <Grid 
        container 
        className={classes.root} 
        spacing={2}
        justify="center"
        alignItems="center"
      >

          <Grid item xs={12} align="right">
            <IconButton aria-label="delete" className={classes.margin} size="small" onClick={() => props.handleSongFormClick()}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography>{ singleSong.title ? 'Edit' : 'Add A New Work' }</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField name="title" label="Title" onChange={handleChange} required fullWidth value={formData.title} />
          </Grid>
          <Grid item  xs={12}>
            <TextField name="composer" label="Composer" onChange={handleChange} required fullWidth value={formData.composer} />
          </Grid>
          <Grid item  xs={12} align="center">
              <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleInstrument}
              value={formData.instrument}
              >
                <MenuItem value='init'><em>Choose an Instrument</em></MenuItem>
                { instruments.map((instr) => <MenuItem value={instr.id}>{instr.label}</MenuItem>) }
            </Select>
          </Grid>
          <Grid item xs={12} align="center">
            <input hidden id="contained-button-file" type="file" name="previewPdf" onChange={handlePdf} />
            <label htmlFor="contained-button-file">
              <IconButton variant="contained" color="light" aria-label="upload pdf" component="span">
                { !formPdf && <PictureAsPdfIcon fontSize="150" className={classes.large}/> }
                { formPdf && 
                  <Document file={previewPdf} >
                    <Page pageNumber={1} height={150} />
                  </Document>
                }
              </IconButton>
            </label>
          </Grid>
          <Grid item  xs={12} align="center">
            <Button type="submit" variant="contained"  onClick={singleSong.title ? handleUpdateSong : handleNewSong }>{ singleSong.title ? 'Save' : 'Add Work' }</Button>
          </Grid>
      </Grid>
    )
}
