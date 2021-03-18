import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./Dashboard/Dashboard"
import { SongForm } from "./Songs/SongForm"
import { SectionList } from "./Sections/SectionList"
import { SectionForm } from "./Sections/SectionForm"
import { SectionProvider } from "./Sections/SectionProvider"
import { SectionDetail } from "./Sections/SectionDetail"

export const AppViews = (props) => {
  return <>
    <SectionProvider>
      <Route exact path="/" render={props => <Dashboard {...props}/>} />
      <Route exact path="/songform" render={props => <SongForm {...props}/>} />
      <Route exact path="/sectionlist" render={props => <SectionList {...props}/>} />
      <Route exact path="/sectionform" render={props => <SectionForm {...props}/>} />
      <Route exact path="/section/:sectionId" render={props => <SectionDetail {...props}/>} />
    </SectionProvider>
  </>
}
