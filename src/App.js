import React from "react"
import { Route, Redirect } from "react-router-dom"
import { NavBar } from "./Nav/NavBar"
import { AppViews } from "./AppViews"
import { SplashScreen } from "./Splashscreen/SplashScreen"
import { AuthProvider } from "./Auth/AuthProvider"
import { makeStyles, useMediaQuery } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100vw',
      height: '100vh',
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(2),
      },  
      backgroundColor: theme.palette.background.paper
    },
}))

export const App = () => {
    const classes = useStyles()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('xs'))
    return (
        <>
                <Route render={() => {
                    if (localStorage.getItem("pp_token")) {
                        return <>
                            <AuthProvider>
                                <Route render={props => <NavBar {...props} />} />
                                <Route render={props => <AppViews {...props} />} />
                            </AuthProvider>
                        </>
                    } else {
                        return (<Redirect to="/splash" />)
                    }
                }} />

                <Route 
                    path="/splash" 
                    render={props => <SplashScreen {...props} />} 
                />
        </>
    )
}
