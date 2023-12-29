import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './AddNote.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
function AddNote() {
    const location = useLocation()

    const [enrollments, setEnrollments] = useState()
    const [subjectId, setSubjectId] = useState('')
    const [noteTitle, setNoteTitle] = useState('')
    const [noteText, setNoteText] = useState('')
    const [noteStatus, setNoteStatus] = useState('notTested')

    const insertNote = async () => {
        const response = await fetch(
            'http://localhost:8080/api/notes/insertNote',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    note_title: noteTitle,
                    note_text: noteText,
                    user_id: localStorage.getItem('userId'),
                    subject_id: subjectId,
                }),
            }
        )
        const data = await response.json()
        if (response.status === 201) {
            console.log(
                'the note was successfully inserted with this data:',
                data
            )
            setNoteStatus('inserted')
        } else if (response.status === 500) {
            console.log('the note was not successfully inserted:', data)
        }
    }
    let subject = []
    const handleButton = () => {
        console.log('ai apsat pe butonul de salvare ')
        console.log('sunject id: ', subjectId)
        console.log('note text:', noteText)
        if (noteStatus === 'notTested') {
            if (subjectId === '') {
                alert('please select  a subject')
            } else if (noteTitle === '') {
                alert('please write a title')
            } else if (noteText === '') {
                alert('please write a note')
            } else {
                insertNote()
            }
        } else if (noteStatus === 'inserted') {
            alert('the note was already inserted')
        }
    }
    if (location && location.state)
        if (location.state.subject) {
            subject = location.state.subject
            console.log(
                'subject from the addnote page is successfully recieved'
            )
        }

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
        console.log('=--------------------', subjectId)
        getStudentEnrollments()
        if (subject.subject_id) {
            setSubjectId(subject.subject_id)
        }
    }, [subject.subject_id, subjectId])
    return (
        <>
            <div className="page-container">
                <div className="add-note-container">
                    <h1>Add a note</h1>
                    <div className="add-note">
                        <div className="subject-name-teacher">
                            <div className="subject-container-select">
                                {enrollments && enrollments.length > 0 ? (
                                    <div>
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
                                                        enrollment.Subject
                                                            .subject_id
                                                    }
                                                >
                                                    {enrollment.Subject
                                                        .subject_name +
                                                        '-' +
                                                        enrollment.Subject
                                                            .Teacher
                                                            .teacher_name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="note-title-container">
                                            <h3>Note title:</h3>
                                            <div className="note-title">
                                                <input
                                                    className="title"
                                                    type="text"
                                                    placeholder="Title for the note:"
                                                    onChange={(e) => {
                                                        setNoteTitle(
                                                            e.target.value
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="note-content-container">
                                            <h3>Note content:</h3>
                                            <ReactQuill
                                                theme="snow"
                                                className="note-text"
                                                placeholder="Note text"
                                                onChange={(e) => {
                                                    setNoteText(e)
                                                }}
                                            ></ReactQuill>
                                            <div className="note-content"></div>
                                        </div>
                                        <button onClick={handleButton}>
                                            Save the note into bd
                                        </button>
                                    </div>
                                ) : (
                                    <h1>You dont have any subjects!!</h1>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNote
