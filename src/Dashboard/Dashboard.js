import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Grid, CircularProgress, Card, CardContent, Button, Box, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { SectionContext } from '../Sections/SectionProvider'
import { Document, Page, pdfjs } from 'react-pdf';
import './Dashboard.scss'


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: "blue",
    position: "absolute",
    left: 0
  },
  top: {
    color: "red",
    position: "absolute",
    left: 0
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

export const Dashboard = (props) => {

  const history = useHistory()

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { userSections, getUserSections } = useContext(SectionContext)

  const classes = useStyles();

  useEffect(() => {
    getUserSections()
  }, [])

  return ( 
    <div className={classes.root}>
       <Grid 
          container 
          className={classes.root} 
          spacing={3}
          justify="center"
        >


          <Grid item xs={12} align="center">
            <Typography variant="h4">Dashboard</Typography>
          </Grid>
          {
              userSections.map(section => {
                return (
              <Grid item xs={11} sm={8} key={section.id}>
                <Card key={section.id}>
                  <CardContent>
                  <Paper>
                    <Grid container spacing={0} justify="center">
                      <Grid item xs={6} align="left" className="d-flex flex-column justify-content-center">
                        <Typography variant="h5">
                          <strong>{section.song.title}</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} align="right" className="d-flex flex-column justify-content-center">
                        <Typography variant="h5">{section.label}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>

                    <Grid container spacing={0} justify="space-between"> 
                          <Grid item xs={12} sm={1} align="center" style={{ minWidth: "120px" }} className='d-flex flex-column justify-content-center'>
                            <Box m={3}>
                            <Document file={section.song.pdf} style={{ height: '100%' }}>
                              <Page pageNumber={1} height={150} />
                            </Document>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm align="center" className="d-flex flex-column justify-content-center">
                        <Box m={3}>
                          <div className={classes.root}>
                          <CircularProgressWithLabel 
                            variant="determinate"
                            value={section.percent_complete} 
                            size={100} 
                            color='secondary' 
                            {...props}
                            thickness={5} 
                            classes={{
                              circle: classes.circle,
                            }}
                            />
                          </div>
                          </Box>
                      </Grid>
                      <Grid 
                        item 
                        xs={12} 
                        sm={1}
                        style = {{minWidth: "120px"}} 
                        align="center"
                        className="d-flex flex-column justify-content-center"
                        >
                          <Box m={3}>
                            <Button 
                              size="small" 
                              color="primary" 
                              variant="contained"
                              onClick={() => history.push(`/section/${section.id}`)}>Practice</Button>
                          </Box>
                      </Grid>
                    </Grid> 
                  </CardContent>
                </Card>
                </Grid>
                )
              })
          }
      </Grid>
    </div>
  )
}
