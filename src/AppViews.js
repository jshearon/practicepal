import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./Dashboard/Dashboard"
import { SongForm } from "./Songs/SongForm"
import { SongList } from "./Songs/SongList"
import { SectionList } from "./Sections/SectionList"
import { SectionForm } from "./Sections/SectionForm"
import { SectionProvider } from "./Sections/SectionProvider"
import { SongProvider } from "./Songs/SongProvider"
import { SectionDetail } from "./Sections/SectionDetail"
import { SongDetail } from "./Songs/SongDetail"

export const AppViews = (props) => {
  return <>
    <SongProvider>
      <SectionProvider>
        <Route exact path="/" render={props => <Dashboard {...props}/>} />
        <Route exact path="/songlist" render={props => <SongList {...props}/>} />
        <Route exact path="/songform" render={props => <SongForm {...props}/>} />
        <Route exact path="/sectionlist" render={props => <SectionList {...props}/>} />
        <Route exact path="/sectionform" render={props => <SectionForm {...props}/>} />
        <Route exact path="/section/:sectionId" render={props => <SectionDetail {...props}/>} />
        <Route exact path="/song/:songId" render={props => <SongDetail {...props}/>} />
      </SectionProvider>
    </SongProvider>
  </>
}
