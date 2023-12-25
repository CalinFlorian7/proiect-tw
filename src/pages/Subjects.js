import React from 'react'
import { useState, useEffect } from 'react'
import '../pages/Subjects.css'
function Subjects() {
    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        selectSubjects()
    }, [])

    const selectSubjects = async () => {
        const response = await fetch(
            'http://localhost:8080/api/subjects/selectSubjectIdName',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teacher_id: localStorage.getItem('userId'),
                }),
            }
        )
        const data = await response.json()
        if (response.status === 200) {
            setSubjects(data)
            console.log('data was successfully inserted')
        } else if (response.status === 500) {
            console.log('data was not successfully inserted')
        }
    }
    return (
        <>
            <div className="page-container">
                <div className="subjects-container"></div>
                {subjects?.map((subject) => (
                    <div className="subject-container" key={subject.subject_id}>
                        <h1>{subject.subject_name}</h1>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Subjects
