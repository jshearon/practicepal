import React, { useState, createContext } from "react"

export const SectionContext = createContext()

export const SectionProvider = (props) => {
    
    const [userSections, setUserSections] = useState({})

    const getUserSections = () => {
        return fetch(`http://localhost:8000/sections?user=true`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
            }
        })
            .then(response => response.json())
            .then(setUserSections)
    }

    return (
        <SectionContext.Provider value={{ userSections, getUserSections }}>
            {props.children}
        </SectionContext.Provider>
    )
}
