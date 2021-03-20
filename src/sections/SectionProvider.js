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

    return (
        <SectionContext.Provider value={{ userSections, getUserSections, singleSection, getSingleSection }}>
            {props.children}
        </SectionContext.Provider>
    )
}
