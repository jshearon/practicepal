import React, { useEffect } from 'react'

export const SectionDetail = (props) => {
    const sectionId = props.match.params.sectionId

    return (
      <div>
        <h1>{sectionId}</h1>
      </div>
    )
}
