import React, { useState, createContext } from "react"

export const SectionContext = createContext()

export const SectionProvider = (props) => {
    
    const [userSections, setUserSections] = useState([])
    const [singleSection, setSingleSection] = useState({})

    const getUserSections = () => {
        return fetch(`http://localhost:8000/sections?user=true`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
            }
        })
            .then(response => response.json())
            .then(setUserSections)
    }

    const getSingleSection = (id) => {
        return fetch(`http://localhost:8000/sections/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
            }
        })
            .then(response => response.json())
            .then(setSingleSection)
    }

    const logAttempt = (attempt) => {
        console.log(attempt)
        return fetch(`http://localhost:8000/attempts`, {
        method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
            },
            body: JSON.stringify(attempt)
        })
            // .then(res => res.json())
    }

    return (
        <SectionContext.Provider value={{ userSections, getUserSections, singleSection, getSingleSection, logAttempt }}>
            {props.children}
        </SectionContext.Provider>
    )
}
