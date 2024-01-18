import React from 'react'
import { useState, useEffect } from 'react'
import '../pages/Subjects.css'
function Subjects() {
    const [subjects, setSubjects] = useState([])
    const [enrollments, setEnrollments] = useState([])

    useEffect(() => {
        if (localStorage.getItem('userType') === 'teacher') selectSubjects()
        if (localStorage.getItem('userType') === 'student') {
            selectAllSubjects()
            getStudentEnrollments()
        }
    }, [])

    const handleButtonClick = (e) => {
        if (e.target.className === 'Enroll') {
            enrollStudent(e.target.value).then(() => {
                console.log('succcess')
                e.target.className = 'Enrolled'
                e.target.innerHTML = 'Enrolled'
            })
            console.log('enroll student,subject:', e.target.value)
        } else {
            console.log('student deja inscris')
        }
    }
    const enrollStudent = async (subject_id) => {
        const response = await fetch(
            'http://localhost:8080/api/enrollments/enrollStudent',
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
                    subject_id: subject_id,
                }),
            }
        )
        const data = await response.json()
        if (response.status === 200) {
            console.log(data)

            console.log('the enrollment  was successful')
        } else if (response.status === 500) {
            console.log('the student is already enrolled')
        }
    }
    const getStudentEnrollments = async () => {
        const response = await fetch(
            'http://localhost:8080/api/enrollments/getAllEnrollments',
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
            console.log(data)
            setEnrollments(data)
            if (data) console.log('Enrollments: ')
            else console.log('No enrollments')
            console.log('the response was successful')
        } else if (response.status === 500) {
            console.log('the response was not successful')
        }
    }
    const selectAllSubjects = async () => {
        const response = await fetch(
            'http://localhost:8080/api/subjects/selectAllSubjects',
            {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        const data = await response.json()
        if (response.status === 200) {
            setSubjects(data)
            console.log(data)
            console.log('data was successfully inserted')
        } else if (response.status === 500) {
            console.log('data was not successfully inserted')
        }
    }
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
            subj
            <div className="page-container">
                <div className="subjects-container"></div>
                {localStorage.getItem('userType') === 'teacher' &&
                subjects.length <= 0 ? (
                    <h3>You don't have any subjects yet</h3>
                ) : null}
                {localStorage.getItem('userType') === 'teacher'
                    ? subjects?.map((subject) => (
                          <div
                              className="subject-container"
                              key={subject.subject_id}
                          >
                              <h1>{subject.subject_name}</h1>
                          </div>
                      ))
                    : subjects?.map((subject) => (
                          <div
                              className="subject-container"
                              key={subject.subject_id}
                          >
                              <h1>{subject.subject_name}</h1>
                              <div className="subject-button">
                                  <button
                                      className={`${
                                          enrollments.length > 0
                                              ? enrollments.some(
                                                    (enrollment) =>
                                                        enrollment.subject_id ===
                                                        subject.subject_id
                                                )
                                                  ? 'Enrolled'
                                                  : 'Enroll'
                                              : 'Enroll'
                                      }`}
                                      value={subject.subject_id}
                                      onClick={(e) => handleButtonClick(e)}
                                  >
                                      {enrollments.length > 0
                                          ? enrollments.some(
                                                (enrollment) =>
                                                    enrollment.subject_id ===
                                                    subject.subject_id
                                            )
                                              ? 'Enrolled'
                                              : 'Enroll'
                                          : 'Enroll'}
                                  </button>
                              </div>
                              <h3>Teacher: {subject.Teacher.teacher_name}</h3>
                          </div>
                      ))}
            </div>
        </>
    )
}

export default Subjects
