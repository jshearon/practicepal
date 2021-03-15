import React from "react"
import { Route } from "react-router-dom"
import { SongList } from "./songs/SongList"
import { SongForm } from "./songs/SongForm"
import { SectionList } from "./sections/SectionList"
import { SectionForm } from "./sections/SectionForm"

export const AppViews = (props) => {
  return <>
    <Route exact path="/" render={props => <SongList {...props}/>} />
    <Route exact path="/songform" render={props => <SongForm {...props}/>} />
    <Route exact path="/sectionlist" render={props => <SectionList {...props}/>} />
    <Route exact path="/sectionform" render={props => <SectionForm {...props}/>} />
  </>
}
