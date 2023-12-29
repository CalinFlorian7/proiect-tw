import React from 'react'
import { Link, useLocation } from 'react-router-dom'

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
                            {subject.subject_id ? (
                                <button className="add-note">
                                    <Link
                                        to="/AddNote"
                                        state={{
                                            subject: {
                                                subject_id: subject.subject_id,
                                                editable: false,
                                                // subject_name:
                                                //     subject.subject_name,
                                                // teacher_name:
                                                //     subject.teacher_name,
                                            },
                                        }}
                                    >
                                        {' '}
                                        Add Note
                                    </Link>
                                </button>
                            ) : null}
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
