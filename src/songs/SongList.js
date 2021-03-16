import React, { useContext, useEffect } from "react"
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { SectionContext } from '../sections/SectionProvider'

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

export const SongList = (props) => {

  const { userSections, getUserSections } = useContext(SectionContext)

  const classes = useStyles();

  useEffect(() => {
    getUserSections()
  }, [])
  

  return ( 
      <Grid 
          container 
          className={classes.root} 
          spacing={0}
          justify="space-around"
          alignItems="center"
          direction="column"
        >


          <Grid item xs={12} align="center">
            <Typography variant="h3">Songs</Typography>
          </Grid>
      </Grid>
  )
}
