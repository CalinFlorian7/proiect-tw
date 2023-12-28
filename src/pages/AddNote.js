import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './AddNote.css'
function AddNote() {
    const location = useLocation()

    const [enrollments, setEnrollments] = useState()
    const [subjectId, setSubjectId] = useState('')

    let subject = []

    if (location.state.subject) subject = location.state.subject
    console.log('subject from the addnote page:', subject)

    const getStudentEnrollments = async () => {
        const response = await fetch(
            'http://localhost:8080/api/enrollments/getStudentEnrollments',
            // http://localhost:8080/api/enrollments/getAllEnrollments'
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem('userId'),
                }),
            }
        )
        const data = await response.json()
        if (response.status === 200) {
            console.log('enrollments:!!!!!!', data)
            setEnrollments(data)

            console.log('the response was successful')
        } else if (response.status === 500) {
            console.log('the response was not successful')
        }
    }

    useEffect(() => {
        getStudentEnrollments()
    }, [])
    return (
        <>
            <div className="page-container">
                <div className="add-note-container">
                    <h1>Notes</h1>
                    <div className="add-note">
                        <div className="subject-name-teacher">
                            <div className="subject-container-select">
                                <h3>Subject:</h3>
                                <select
                                    className="subjects"
                                    value={subjectId}
                                    onChange={(e) => {
                                        setSubjectId(e.target.value)
                                    }}
                                >
                                    {enrollments?.map((enrollment) => (
                                        <option
                                            value={
                                                enrollment.Subject.subject_id
                                            }
                                        >
                                            {enrollment.Subject.subject_name +
                                                '-' +
                                                enrollment.Subject.Teacher
                                                    .teacher_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNote
