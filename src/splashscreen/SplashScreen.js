import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { Login } from '../Auth/Login'
import { Register } from '../Auth/Register'
import MetronomeAnimation from '../Animation/Lottie'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    flexGrow: 1,
    height: '100vh',
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

export const SplashScreen = (props) => {

  const classes = useStyles();

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleLoginClick = () => {
    setOpenLogin(!openLogin);
  };

  const handleRegisterClick = () => {
    setOpenRegister(!openRegister);
  };

  return (
      <Grid 
          container 
          className={classes.root} 
          spacing={0}
          justify="space-around"
          alignItems="center"
          direction="column"
        >

          <Grid item align="center" >
            <Typography variant="h2">Practice Pal</Typography>
          </Grid>
          <Grid item align="center" >
            <MetronomeAnimation />
          </Grid>
          <Grid item align="center" >
            <Typography variant="h5">Please <Link onClick={handleLoginClick}>Login</Link> or <Link onClick={handleRegisterClick}>Register</Link></Typography>
            <Dialog open={openLogin} onClose={openLogin}>
              <Login handleLoginClick={handleLoginClick} />
            </Dialog>
            <Dialog open={openRegister} onClose={openRegister}>
              <Register handleRegisterClick={handleRegisterClick}/>
            </Dialog>
          </Grid>
      </Grid>
  )
}
