import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Notes.css'
import { useState, useEffect } from 'react'
import { FaShare } from 'react-icons/fa'
import Share from '../components/Share'

function Notes() {
    const location = useLocation()
    const [subject, setSubject] = useState([])
    const [subjectId, setSubjectId] = useState(null)
    const [notes, setNotes] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)
    const [noteId, setNoteId] = useState(null)
    const [title, setTitle] = useState(null)

    console.log(location.state)
    const deleteNote = async (noteIdDelete) => {
        console.log('note to be deleted', noteIdDelete)
        try {
            const response = await fetch(
                'http://localhost:8080/api/notes/deleteNote',
                {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${localStorage.getItem(
                            'accessToken'
                        )}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        note_id: noteIdDelete,
                    }),
                }
            )
            const data = await response.json()
            if (response.status === 200) {
                console.log('note deleted', data)

                console.log('notes before delete', notes)
                let newNotes = notes.filter(
                    (note) => parseInt(note.note_id) !== parseInt(noteIdDelete)
                )

                console.log('new notes', newNotes)

                setNotes(newNotes)
                // console.log('notes after delete:', notes)

                // const updatedNotes = [...notes]
                // // const index = updatedNotes.findIndex(
                // //     (n) => n.note_id === noteId
                // // )
                // console.log('note index', noteIndex)
                // if (noteIndex !== -1) {
                //     console.log('ar trebui sa se stearga nota')
                //     updatedNotes.splice(noteIndex, 1)
                //     setNotes(updatedNotes)
                // }
            }
            if (response.status === 500) {
                console.log('Something went wrong!')
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() => {
        const getNotesBySubjectAndUser = async () => {
            try {
                console.log('esti in functie')
                const response = await fetch(
                    'http://localhost:8080/api/notes/getNotesBySubjectAndUser',

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
                            subject_id: subjectId,
                        }),
                    }
                )
                const data = await response.json()
                if (response.status === 200) {
                    console.log('noted from db ', data)
                    setNotes(data.notes)
                }
                if (response.status === 500) {
                    console.log('Something went wrong! ')
                }
            } catch (error) {
                console.error(error.message)
            }
        }

        if (location.pathname === '/Notes')
            setSubject(location.state ? location.state.subject : null)
        console.log('current subject: ', subject)
        if (subject.subject_id !== undefined && subject.subject_id !== null) {
            setSubjectId(subject.subject_id)
            console.log('subject id: ', subjectId)
        }

        if (subjectId !== undefined && subjectId !== null) {
            getNotesBySubjectAndUser()
        }
    }, [location.state, location.pathname, subject, subjectId])

    const openPopUp = () => {
        setShowPopUp(true)
    }
    const closePopUp = () => {
        setShowPopUp(false)
    }
    return (
        <>
            {/* <button type="button" onClick={openPopUp}>
                arata overlay
            </button> */}
            {showPopUp && (
                <Share
                    onClose={closePopUp}
                    noteId={noteId}
                    noteTitle={title}
                    subjectId={subjectId}
                />
            )}

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
                        <div className="notes">
                            {notes && notes.length > 0 ? (
                                <div className="note-container">
                                    {notes.map((note) => (
                                        <div className="note">
                                            <div className="share-container">
                                                <button
                                                    className="share-button"
                                                    onClick={(e) => {
                                                        console.log(
                                                            'share clicked'
                                                        )
                                                        setNoteId(note.note_id)
                                                        setTitle(
                                                            note.note_title
                                                        )
                                                        openPopUp()
                                                    }}
                                                >
                                                    <FaShare />
                                                </button>
                                            </div>
                                            <Link
                                                className="note-link"
                                                to="/AddNote"
                                                state={{
                                                    subject: {
                                                        subject_id:
                                                            subject.subject_id,
                                                        editable: false,
                                                        note: note,
                                                    },
                                                }}
                                            >
                                                <div className="note-title-link">
                                                    <h2>{note.note_title}</h2>
                                                </div>
                                            </Link>
                                            <div className="note-button">
                                                <button
                                                    className="delete-note"
                                                    value={note.note_id}
                                                    onClick={(e) => {
                                                        deleteNote(
                                                            e.target.value
                                                        )
                                                        console.log(
                                                            `Deleting ${note.note_id}`
                                                        )
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                            <div className="note-date">
                                                <h3 className="note-date">
                                                    {note.note_date.slice(
                                                        0,
                                                        10
                                                    )}
                                                </h3>
                                            </div>
                                            <div className="note-buttons"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <span className="no-notes">No notes yet</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes
