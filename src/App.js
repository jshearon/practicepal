import React from "react"
import { Route, Redirect } from "react-router-dom"
// import { AppViews } from "./AppViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const App = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("pp_token")) {
                return <>
                    <Route render={NavBar} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/register" render={(props) => <Register {...props} />} />
    </>
)
