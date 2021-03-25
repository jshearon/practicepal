import React, { useEffect, useState, useContext } from "react"
import { TextField, Button, Typography, Grid, IconButton, Select, MenuItem, FormControl, Input, InputLabel, Checkbox, ListItemText } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import "../Auth/Auth.scss"
import { SectionContext } from '../Sections/SectionProvider'
import { SongContext } from '../Songs/SongProvider'


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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const SectionForm = (props) => {

  const { addSection, updateSection, singleSection, getSingleSection } = useContext(SectionContext)
  const { getSingleSong } = useContext(SongContext)

  const classes = useStyles();

  const initialFormData = Object.freeze({
    song: "",
    label: "",
    initial_bpm: "",
    target_bpm: "",
    beats: "",
    division: "",
    tries: "",
  });

  const [formData, setFormData] = useState(initialFormData);
  const [pdfPageNums, setPdfPageNums] = useState([0])

  useEffect(() => {
    setFormData({
      song: props.songId,
      label: singleSection.label,
      initial_bpm: singleSection.initial_bpm,
      target_bpm: singleSection.target_bpm,
      pdf_page_nums: singleSection.pdf_page_nums,
      beats: singleSection.beats,
      division: singleSection.division,
      tries: singleSection.tries,
    })
  }, [singleSection])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNewSection = (e) => {
      e.preventDefault()
      const newSection = formData
      newSection.pdf_page_nums = pdfPageNums
      addSection(newSection)
          .then(res => {
            getSingleSong(props.songId)
            props.setOpenSectionForm(false)
          })
  }

  const handleUpdateSection = (e) => {
    e.preventDefault()
    const updatedSection = formData
    updatedSection.pdf_page_nums = pdfPageNums
    updateSection(updatedSection, props.sectionEditId)
        .then(res => {
          getSingleSong(props.songId)
          props.setOpenSectionForm(false)
        })
  }

  const handlePdfChange = (e) => {
    if (e.target.value === 0) {
      return
    }
    setPdfPageNums(e.target.value.filter(num => num !== 0))
  }

  useEffect(() => {
    props.sectionId && getSingleSection(props.sectionId)
  }, [props.sectionId])

    return (
      <Grid 
        container 
        className={classes.root} 
        spacing={2}
        justify="center"
        alignItems="center"
      >

          <Grid item xs={12} align="right">
            <IconButton aria-label="delete" className={classes.margin} size="small" onClick={() => props.setOpenSectionForm(false)}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography>{ singleSection.label ? 'Edit' : 'Add A New Section' }</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField name="label" label="Section Label" onChange={handleChange} required fullWidth value={formData.label} />
          </Grid>
          <Grid item  xs={5}>
            <TextField name="initial_bpm" label="Starting Tempo" onChange={handleChange} required fullWidth value={formData.initial_bpm} />
          </Grid>
          <Grid item  xs={1}>
            <Typography> - </Typography>
          </Grid>
          <Grid item  xs={5}>
            <TextField name="target_bpm" label="Target Tempo" onChange={handleChange} required fullWidth value={formData.target_bpm} />
          </Grid>
          <Grid item  xs={5}>
            <TextField name="beats" label="No. Of Beats" onChange={handleChange} required fullWidth value={formData.beats} />
          </Grid>
          <Grid item  xs={5}>
            <TextField name="division" label="Beat Division" onChange={handleChange} required fullWidth value={formData.division} />
          </Grid>
          <Grid item  xs={12}>
            <TextField name="tries" label="No. Of Tries" onChange={handleChange} required fullWidth value={formData.tries} />
          </Grid>
          <Grid item  xs={12}>
          <FormControl>
            <InputLabel id="demo-mutiple-name-label">Page No.</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={pdfPageNums}
                onChange={handlePdfChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                <MenuItem key={0} value="0" >
                  Select Pages
                </MenuItem>
              {props.pageArray.map((num) => (
                <MenuItem key={num} value={num} >
                  Page {num}
                </MenuItem>
              ))}
              </Select>
          </FormControl>
          </Grid>
          <Grid item  xs={12} align="center">
            <Button type="submit" variant="contained"  onClick={singleSection.id ? handleUpdateSection : handleNewSection }>{ singleSection.id ? 'Save' : 'Add Section' }</Button>
          </Grid>
      </Grid>
    )
}
