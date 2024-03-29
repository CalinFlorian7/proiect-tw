import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
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
    const [noteId, setNoteId] = useState('')
    const [files, setFiles] = useState(null)

    const deleteFile = async (file_id) => {
        const response = await fetch(
            'http://localhost:8080/api/documents/deleteDocument',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    document_id: file_id,
                }),
            }
        )
        const data = await response.json()
        if (response.status === 200) {
            console.log('the document was successfully deleted:', data)
            alert('the document was successfully deleted')
            getFiles()
        } else if (response.status === 500) {
            console.log('the document was not successfully deleted:', data)
        }
    }
    const [filesInserted, setFilesInserted] = useState([])
    const getFiles = useCallback(async () => {
        const response = await fetch(
            'http://localhost:8080/api/documents/getDocumentNameAndId',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    note_id: noteId,
                }),
            }
        )

        const data = await response.json()
        if (response.status === 200) {
            console.log('files already inserted:', data)
            setFilesInserted(data)
        } else if (response.status === 500) {
            console.log('the response was not successful')
        }
    }, [noteId])
    const insertFile = async (fileContent, fileName) => {
        const response = await fetch(
            'http://localhost:8080/api/documents/insertDocument',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    document_name: fileName,
                    document_path: fileContent,
                    note_id: noteId,
                }),
            }
        )
        const data = await response.json()
        if (response.status === 201) {
            console.log(
                'the document was successfully inserted with this data:',
                data
            )
            // setFilesInserted([
            //     ...filesInserted,
            //     {
            //         id: data.document.document_id,
            //         name: data.document.document_name,
            //     },
            // ])
            getFiles()
            // const newFile = {
            //     id: data.document.document_id,
            //     name: data.document.document_name,
            // }
            // setFilesInserted([...filesInserted, newFile])
            // console.log('date pt lista:', filesInserted)
            console.log('id document de la server din bd:', data.document_id)
            // alert('the document was successfully inserted')
        } else if (response.status === 500) {
            console.log('the document was not successfully inserted:', data)
        }
    }
    const handleUpload = async () => {
        if (noteId) {
            if (!files) {
                alert('No files selected')
                return
            }
            const formData = new FormData()

            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const fileContent = await readFileAsync(file)
                console.log('File content:', fileContent)
                console.log('File name:', file.name)
                formData.append(`file${i + 1}`, file)
                if (fileContent) insertFile(fileContent, file.name)
            }

            // Accessing file data

            // Reading file content
        } else {
            console.log('You need to save the note first')
        }
    }

    const readFileAsync = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (event) => {
                resolve(event.target.result)
            }
            reader.onerror = (event) => {
                reject(event.target.error)
            }
            reader.readAsDataURL(file)
        })
    }
    const updateNoteTitleText = async () => {
        const response = await fetch('http://localhost:8080/api/notes/update', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                note_title: noteTitle,
                note_text: noteText,
                note_id: noteId,
            }),
        })
        const data = await response.json()
        if (response.status === 200) {
            console.log(
                'the note was successfully updated with this data:',
                data
            )
            alert('the note was successfully updated')
        } else if (response.status === 404) {
            alert('modifica titlul sau contentul')
        } else if (response.status === 500) {
            console.log('the note was not successfully updated:', data)
        }
    }
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
            setNoteId(data.note.note_id)
            console.log('id nota de la server din bd:', data.note.note_id)
            alert('the note was successfully inserted')
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
        } else if (noteStatus === 'inserted' && noteId) {
            if (subjectId === '') {
                alert('please select  a subject')
            } else if (noteTitle === '') {
                alert('please write a title')
            } else if (noteText === '') {
                alert('please write a note')
            } else {
                updateNoteTitleText()
            }
        }
    }
    if (location && location.state) {
        if (location.state.subject) {
            subject = location.state.subject

            console.log(
                'subject from the addnote page is successfully recieved'
            )
        }
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
        getStudentEnrollments()

        if (subject.subject_id && subject.editable === false) {
            setSubjectId(subject.subject_id)
        }
        if (subject.note !== undefined && subject.note !== null) {
            if (subject.note.note_title && subject.note.note_text) {
                setNoteText(subject.note.note_text)
                setNoteTitle(subject.note.note_title)

                document.getElementsByClassName('title').value =
                    subject.note.note_title

                console.log('sunject title', subject.note.note_title)
                console.log('sunject text', subject.note.note_text)
            }
            if (subject.note.note_id) {
                setNoteId(subject.note.note_id)
                setNoteStatus('inserted')
                getFiles()
            }
        }
    }, [
        subject.subject_id,
        subject.editable,
        subjectId,
        subject.note,
        getFiles,
    ])
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
                                            disabled={!subject.editable}
                                            onChange={(e) => {
                                                setSubjectId(e.target.value)
                                                console.log(
                                                    'valoare select!!!!: ',
                                                    e.target.value
                                                )
                                                setNoteStatus('notTested')
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
                                                    defaultValue={noteTitle}
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
                                                defaultValue={noteText}
                                                onChange={(e) => {
                                                    setNoteText(e)
                                                }}
                                            ></ReactQuill>
                                        </div>
                                        <div className="input-files-container">
                                            <div className="input-files">
                                                <h3>Upload files:</h3>
                                                <input
                                                    type="file"
                                                    multiple
                                                    onChange={(e) => {
                                                        console.log(
                                                            'files: ',
                                                            e.target.files
                                                        )
                                                        setFiles(e.target.files)
                                                    }}
                                                />
                                                <button
                                                    onClick={handleUpload}
                                                    className="buton-upload"
                                                >
                                                    Upload the files
                                                </button>
                                            </div>
                                            <div className="input-files-names">
                                                <h3>Files uploaded:</h3>
                                                <div className="files-names">
                                                    {filesInserted.length >
                                                    0 ? (
                                                        <div className="files-names">
                                                            <ul className="files-names-ul">
                                                                {filesInserted.map(
                                                                    (file) => (
                                                                        <li
                                                                            className="file-name-document"
                                                                            value={
                                                                                file.document_id
                                                                            }
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                deleteFile(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                                console.log(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }}
                                                                        >
                                                                            {file.document_name +
                                                                                '-' +
                                                                                file.document_id}
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    ) : null}
                                                    {/* {filesInserted.length > 0
                                                        ? filesInserted.map(
                                                              (file) => (
                                                                  <p>
                                                                      {
                                                                          file.name
                                                                      }
                                                                  </p>
                                                              )
                                                          )
                                                        : null} */}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="save-note"
                                            onClick={handleButton}
                                        >
                                            {noteStatus === 'notTested'
                                                ? 'Save the note into bd'
                                                : 'Update the note into bd'}
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
