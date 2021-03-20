import React, { useState, createContext } from "react"

export const SongContext = createContext()

export const SongProvider = (props) => {
    
    const [userSongs, setUserSongs] = useState([])
    const [singleSong, setSingleSong] = useState({})

    const getUserSongs = () => {
        return fetch(`http://localhost:8000/songs?user=true`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
            }
        })
            .then(response => response.json())
            .then(setUserSongs)
    }

    const getSingleSong = (id) => {
        return fetch(`http://localhost:8000/songs/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
            }
        })
            .then(response => response.json())
            .then(setSingleSong)
    }

    return (
        <SongContext.Provider value={{ userSongs, getUserSongs, singleSong, getSingleSong }}>
            {props.children}
        </SongContext.Provider>
    )
}
