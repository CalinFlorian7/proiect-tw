import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../pages/Enrollments.css'

function Enrollments() {
    const [enrollments, setEnrollments] = useState([])

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
            console.log(data)
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
                <div className="enrollments-container-studnet">
                    <div className="enrollments">
                        {enrollments && enrollments.length > 0 ? (
                            enrollments.map((enrollment) => (
                                <div className="enrollment" key={enrollment.id}>
                                    <div className="enrollment-name">
                                        <span>
                                            <Link
                                                to="/Notes"
                                                state={{
                                                    subject: {
                                                        subject_id:
                                                            enrollment.Subject
                                                                .subject_id,
                                                        subject_name:
                                                            enrollment.Subject
                                                                .subject_name,
                                                        teacher_name:
                                                            enrollment.Subject
                                                                .Teacher
                                                                .teacher_name,
                                                    },
                                                    //     subject_id:
                                                    //         enrollment.Subject
                                                    //             .subject_id,
                                                    //     subject_name:
                                                    //         enrollment.Subject
                                                    //             .subject_name,
                                                }}
                                            >
                                                <h1>
                                                    {
                                                        enrollment.Subject
                                                            .subject_name
                                                    }
                                                </h1>
                                            </Link>
                                        </span>
                                    </div>
                                    <div className="enrollment-teacher">
                                        <h3>
                                            Teacher:{' '}
                                            {
                                                enrollment.Subject.Teacher
                                                    .teacher_name
                                            }
                                        </h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No enrollments</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Enrollments
