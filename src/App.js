import React from "react"
import { Route, Redirect } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { AppViews } from "./AppViews"
import { SplashScreen } from "./splashscreen/SplashScreen"
import { AuthProvider } from "./auth/AuthProvider"

export const App = () => (
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

        <Route path="/splash" render={props => <SplashScreen {...props}/>} />
    </>
)
