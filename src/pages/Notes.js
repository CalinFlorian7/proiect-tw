import React from 'react'
import { useLocation } from 'react-router-dom'

import './Notes.css'
function Notes() {
    const location = useLocation()
    console.log(location.state)
    let subject = []
    if (location.pathname === '/Notes')
        subject = location.state ? location.state.subject : null
    console.log(subject)

    return (
        <>
            <div className="page-container">
                <div className="notes-container">
                    <div className="subject-details">
                        <div className="subject-name-teacher">
                            <h1>{subject ? subject.subject_name : null}</h1>
                            <h3>
                                Teacher: {subject ? subject.teacher_name : null}
                            </h3>
                            <div className="break"></div>
                        </div>
                    </div>
                    <div className="notes"></div>
                </div>
            </div>
        </>
    )
}

export default Notes
