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

    const addSection = (section) => {
        return fetch("http://localhost:8000/sections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
            },
            body: JSON.stringify(section)
        })
            .then(res => res.json())
    }

    const updateSection = (section, id) => {
        return fetch(`http://localhost:8000/sections/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
            },
            body: JSON.stringify(section)
        })
    }

    const deleteSection = (id) => {
        return fetch(`http://127.0.0.1:8000/sections/${id}`, {
                    method: "DELETE",
                    headers: {
                    "Authorization": `Token ${localStorage.getItem("pp_token")}`
                    },
                })
                    .then(res => res.json())
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
        <SectionContext.Provider value={{ userSections, getUserSections, singleSection, setSingleSection, getSingleSection, logAttempt, addSection, updateSection, deleteSection }}>
            {props.children}
        </SectionContext.Provider>
    )
}
