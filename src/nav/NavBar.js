import React, { useEffect, useContext } from "react"
import { AuthContext } from '../auth/AuthProvider'
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {

    const { profile, getProfile } = useContext(AuthContext)

    useEffect(() => {
        localStorage.getItem("pp_token") && getProfile()
    }, [])


    return (
        <ul className="navbar">
            <li>{profile && profile.user.first_name}</li>
            <li><img src={profile && profile.profile_image} alt="Profile Pic" /></li>
            <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                props.history.push({ pathname: "/" })
                            }}
                        >Games</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                props.history.push({ pathname: "/events" })
                            }}
                        >Events</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                props.history.push({ pathname: "/profile" })
                            }}
                        >Profile</button>
                    </li>
            {
                (localStorage.getItem("pp_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("pp_token")
                                props.history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
