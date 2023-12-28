import React from 'react'
import { useLocation } from 'react-router-dom'
function AddNote() {
    const location = useLocation()
    console.log('subject from the addnote page:', location.state)

    let subject = []
    if (location.state.subject) subject = location.state.subject
    console.log('subject from the addnote page:', subject)
    return <>AddNote</>
}

export default AddNote
