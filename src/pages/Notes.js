import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Notes.css'
import { useState, useEffect } from 'react'
function Notes() {
    const location = useLocation()
    const [subject, setSubject] = useState([])
    const [subjectId, setSubjectId] = useState(null)
    console.log(location.state)

    useEffect(() => {
        if (location.pathname === '/Notes')
            setSubject(location.state ? location.state.subject : null)
        console.log('current subject: ', subject)
        if (subject.subject_id !== undefined && subject.subject_id !== null) {
            setSubjectId(subject.subject_id)
            console.log('subject id: ', subjectId)
        }
    }, [location.state, location.pathname, subject, subjectId])
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
                    <div className="notes-container">
                        <div className="notes"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes
