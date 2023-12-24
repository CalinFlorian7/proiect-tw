import React from 'react'
import '../pages/AddSubject.css'
import { useState } from 'react'
function AddSubject() {
    const [subjectName, setSubjectName] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('notTested') // 'notTested', 'success', 'error'

    const inserSubject = async () => {
        const response = await fetch(
            'http://localhost:8080/api/subjects/insertSubject',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    subject_name: subjectName,
                    teacher_id: localStorage.getItem('userId'),
                }),
            }
        )
        const data = await response.json()
        if (response.status === 201) {
            setMessageStatus('success')
            setMessage(data.message)
            console.log('data was successfully inserted')
        } else if (response.status === 500) {
            setMessageStatus('error')
            setMessage(data.error)
            console.log('data was not successfully inserted')
        }
    }
    const saveSubject = () => {
        if (subjectName === '') {
            setMessageStatus('error')
            setMessage('Please enter a subject name')
        } else {
            inserSubject()
        }
    }
    return (
        <>
            <div className="page-container">
                <div className="add-subject-container">
                    <h1>Add a subject</h1>
                    <form className="subject-form" action="#">
                        <div className="main-form-container">
                            <div className="form-container">
                                {messageStatus === 'success' ? (
                                    <div
                                        className={
                                            messageStatus === 'notTested'
                                                ? 'message-container-none'
                                                : 'message-container'
                                        }
                                    >
                                        <span className="message-success">
                                            {message}
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            messageStatus === 'notTested'
                                                ? 'message-container-none'
                                                : 'message-container'
                                        }
                                    >
                                        <span className="message-error">
                                            {message}
                                        </span>
                                    </div>
                                )}
                                <div className="input-container">
                                    <label
                                        className="subject-label"
                                        htmlFor="subjectName"
                                    >
                                        Subject Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="subjectName"
                                        name="subjectName"
                                        onChange={(e) =>
                                            setSubjectName(e.target.value)
                                        }
                                        placeholder="Enter subject name"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        saveSubject()
                                    }}
                                >
                                    Add Subject
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddSubject
