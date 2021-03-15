import React, { useState } from "react"
import { Link } from "react-router-dom"
import { TextField, Button, Typography, Avatar, Grid } from '@material-ui/core'
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

export const Register = (props) => {

  const classes = useStyles();

  const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const [formData, setFormData] = useState(initialFormData);
  const [formImg, setFormImg] = useState();
  const [previewImg, setPreviewImg] = useState();
  const [validatedPassword, setValidatedPassword] = useState(true)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const verifyPassword = (e) => {
    formData.password === formData.verifyPassword 
      ? setValidatedPassword(true) 
      : setValidatedPassword(false) 
  }

  const handleImg = (e) => {
    e.target.files &&
    e.target.files[0].length > 0 &&
      setFormImg(e.target.files[0])
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
  }

  const handleRegister = (e) => {
      e.preventDefault()

      const formEnc  = new FormData();

      for(const key in formData) {
        formEnc.append(key, formData[key]);
      }

      formEnc.append('profileImage', formImg)

          return fetch("http://127.0.0.1:8000/register", {
              method: "POST",
              body: formEnc
          })
              .then(res => res.json())
              .then(res => {
                  if ("token" in res) {
                      localStorage.setItem("pp_token", res.token)
                      props.history.push("/")
                  }
              })
  }

    return (
      <Grid 
        container 
        className={classes.root} 
        spacing={5}
        justify="center"
        alignItems="center"
      >

          <Grid item xs={12}>
            <Typography>Register an account</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField name="firstName" label="First Name" onChange={handleChange} required fullWidth />
          </Grid>
          <Grid item  xs={12}>
            <TextField name="lastName" label="Last Name" onChange={handleChange} required fullWidth  />
          </Grid>
          <Grid item  xs={12}>
            <TextField name="email" label="Email" onChange={handleChange} required type="email" fullWidth />
          </Grid>
          <Grid item  xs={12}>
            {
              validatedPassword
                ? <TextField name="password" label="Password" onChange={handleChange} required type="password" fullWidth  />
                : <TextField error name="password" label="Password" onChange={handleChange} required type="password" fullWidth  />
             }
          </Grid>
          <Grid item  xs={12}>
            {
              validatedPassword
                ? <TextField name="verifyPassword" label="Verify Password" onChange={handleChange} onBlur={verifyPassword} required type="password" fullWidth  />
                :<TextField error name="verifyPassword" label="Verify Password" onChange={handleChange} onBlur={verifyPassword} required type="password" fullWidth  />
            }
          </Grid>
          <Grid item xs={12} align="center">
            <input hidden id="contained-button-file" type="file" name="profileImage" onChange={handleImg} />
            <label htmlFor="contained-button-file">
              <Avatar id="target" src={previewImg} alt={formData.firstName} className={classes.large} component="span" />
            </label>
          </Grid>
          <Grid item  xs={12} align="center">
            <Button type="submit" variant="contained" onClick={handleRegister}>Register</Button>
          </Grid>

        <Grid item  xs={12} align="center">
          <section className="link--register">
            Already registered? <Link to="/login">Login</Link>
          </section>
        </Grid>
      </Grid>
    )
}
