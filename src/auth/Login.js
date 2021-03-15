import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { useHistory } from "react-router-dom";
import { TextField, Button, Typography, Grid, IconButton } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import "./Auth.scss"

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

export const Login = (props) => {

    let history = useHistory();

    const classes = useStyles();

    const [username, setUserName] = useState();
    const [pw, setPw] = useState();
    const [validatedPassword, setValidatedPassword] = useState(true);


    const handleChange =(e) => {
        e.preventDefault()

        e.target.name === "username"
            ? setUserName(e.target.value)
            : setPw(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: pw
            })
        })
            .then(res => res.json())
            .then(res => {
                if ('valid' in res && res.valid && 'token' in res) {
                    localStorage.setItem( 'pp_token', res.token )
                    history.push('/')
                }
                else {
                    setValidatedPassword(false)
                }
            })
    }

    return (
        <Grid 
        container 
        className={classes.root} 
        spacing={0}
        justify="center"
        alignItems="center"
        >
            <Grid item xs={12} align="right">
                <IconButton aria-label="delete" className={classes.margin} size="small" onClick={() => props.handleLoginClick()}>
                <CancelIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Typography>Please sign in</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField name="username" label="Username" onChange={handleChange} required fullWidth  />
            </Grid>
            <Grid item xs={12}>
                {
                    validatedPassword
                    ? <TextField name="password" label="Password" onChange={handleChange} required type="password" fullWidth  />
                    : <TextField name="password" label="Password" onChange={handleChange} required type="password" fullWidth error />
                }
            </Grid>
            <Grid item  xs={12} align="center">
                <Button variant="contained" onClick={handleLogin}>Log In</Button>
            </Grid>
            <Grid item  xs={12} align="center">
                <Link to='/register'>Not a member yet?</Link>
            </Grid>
        </Grid>
    )
}
