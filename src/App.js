import React from "react"
import { Route, Redirect } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { AppViews } from "./AppViews"
import { SplashScreen } from "./splashscreen/SplashScreen"

export const App = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("pp_token")) {
                return <>
                    <Route render={props => <NavBar {...props} />} />
                    <Route render={props => <AppViews {...props} />} />
                </>
            } else {
                return (<Redirect to="/splash" />)
            }
        }} />

        <Route path="/splash" render={props => <SplashScreen {...props}/>} />
    </>
)
