import React from "react"
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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

export const SectionForm = (props) => {

  const classes = useStyles();

  return (
      <Grid 
          container 
          className={classes.root} 
          spacing={10}
          justify="space-around"
          alignItems="center"
          direction="column"
        >

          <Grid item xs={12} align="center">
            <Typography variant="h1">Section Form</Typography>
          </Grid>
      </Grid>
  )
}
