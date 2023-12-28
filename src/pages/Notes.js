import React from 'react'
import { useLocation } from 'react-router-dom'
function Notes() {
    const location = useLocation()
    console.log(location.state)
    console.log(location.state.subject.teacher_name)
    // console.log('subject id from notes: ', location.state.subject_id)
    // console.log('subject name from notes: ', location.state.subject_name)
    return (
        <>
            <div className="page-container">
                <div className="notes-container">
                    <div className="notes"></div>
                </div>
            </div>
        </>
    )
}

export default Notes
