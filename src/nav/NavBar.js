import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
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
