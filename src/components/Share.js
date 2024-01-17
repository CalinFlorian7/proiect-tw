import React from 'react'
import './Share.css'
import { useState } from 'react'
function Share({ onClose, noteId, noteTitle, subjectId }) {
    const [userChecked, setUserChecked] = useState(true)
    const [groupChecked, setGroupChecked] = useState(false)
    const [email, setEmail] = useState('')
    const [memberships, setMemberships] = useState([])
    const [membershipId, setMembershipId] = useState(null)
    const getGroupsByMemberships = async () => {
        const response = await fetch(
            'http://localhost:8080/api/memberships/getGroupsByMemberships',
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
            console.log('data was successfully retrieved', data)
            setMemberships(data.memberships)
        } else if (response.status === 500) {
            console.log('data was not successfully retrieved')
        }
    }
    const insertMessage = async () => {
        const response = await fetch(
            'http://localhost:8080/api/messages/insertMessage',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    membership_id: membershipId,
                    note_id: noteId,
                }),
            }
        )
        const data = await response.json()
        if (response.status === 201) {
            console.log('data was successfully retrieved', data)
            alert('The note was successfully sent')
        } else if (response.status === 500) {
            console.log('Internal Server Error')
        }
    }
    const handleUserChecked = () => {
        if (!userChecked) {
            setUserChecked(!userChecked)
            setGroupChecked(!groupChecked)
        }
    }

    const insertNoteToStudentEmail = async () => {
        const response = await fetch(
            'http://localhost:8080/api/enrollments/inserNoteToStudentEmail',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_email: email,
                    note_id: noteId,
                    subject_id: subjectId,
                }),
            }
        )
        const data = await response.json()
        if (response.status === 200) {
            console.log('data was successfully retrieved', data)
            alert('The note was successfully sent')
        } else if (response.status === 500) {
            console.log('Internal Server Error')
        } else if (response.status === 404) {
            console.log('student not found')
            alert('The student could not be found')
        } else if (response.status === 201) {
            alert('The student is not enrolled in this subject')
        } else {
            if (response.status === 222) {
                alert('documents loaded')
            }
        }
    }
    const handleShareSubmit = () => {
        console.log('click')
        if (userChecked) {
            console.log('email', email)
            if (email !== '' && subjectId && noteId) {
                console.log('se apeleaza')
                insertNoteToStudentEmail()
            }
        } else if (groupChecked) {
            console.log('group')
            if (membershipId != null && noteId) {
            }
        }
    }
    const handleGroupChecked = () => {
        if (!groupChecked) {
            setGroupChecked(!groupChecked)
            setUserChecked(!userChecked)
            getGroupsByMemberships()
        }
    }
    return (
        console.log('noteId', noteId),
        console.log('title', noteTitle),
        console.log('subjectId', subjectId),
        (
            <>
                <div className="overlay">
                    <div className="overlay-background" onClick={onClose}></div>
                    <div className="overlay-container">
                        <div className="overlay-content">
                            <div className="overlay-button-close">
                                <button
                                    className="overlay-close"
                                    type="button"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>
                            <div className="overlay-body">
                                <h2>
                                    Note shared:{' '}
                                    <span className="note-title-shared">
                                        {noteTitle}
                                    </span>
                                </h2>
                                <h2>Send to:</h2>
                                <div className="note-destination-container">
                                    <label className="note-destination-label">
                                        Group:
                                    </label>

                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        defaultValue="1"
                                        checked={groupChecked}
                                        onChange={handleGroupChecked}
                                    />
                                    <label className="note-destination-label">
                                        User:
                                    </label>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        checked={userChecked}
                                        onChange={handleUserChecked}
                                        defaultValue="0"
                                    />
                                    <div className="share-form-container">
                                        {userChecked === true ? (
                                            <div className="share-form">
                                                stud
                                                <label className="note-destination-label">
                                                    The email of the user:
                                                </label>
                                                <input
                                                    className="note-destination-input"
                                                    type="text"
                                                    placeholder="Enter the email of the user"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className="share-form">
                                                group
                                                <label className="note-destination-label">
                                                    Select the name of the
                                                    group:
                                                </label>
                                                <select
                                                    className="note-destination-input"
                                                    name="group"
                                                    id="group"
                                                    onChange={(e) => {
                                                        setMembershipId(
                                                            e.target.value
                                                        )

                                                        console.log(
                                                            'id????????',
                                                            e.target.value
                                                        )
                                                    }}
                                                >
                                                    {memberships.length > 0 ? (
                                                        memberships.map(
                                                            (membership) => (
                                                                <option
                                                                    value={
                                                                        membership.membership_id
                                                                    }
                                                                >
                                                                    {
                                                                        membership
                                                                            .Group
                                                                            .group_name
                                                                    }
                                                                </option>
                                                            )
                                                        )
                                                    ) : (
                                                        <option value={null}>
                                                            You don't have any
                                                            groups
                                                        </option>
                                                    )}
                                                    {/* {memberships.map(
                                                        (membership) => (
                                                            <option
                                                                value={
                                                                    membership.membership_id
                                                                }
                                                            >
                                                                {
                                                                    membership
                                                                        .Group
                                                                        .group_name
                                                                }
                                                            </option>
                                                        )
                                                    )} */}
                                                </select>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleShareSubmit}
                                            type="button"
                                            className={
                                                userChecked
                                                    ? 'button-user'
                                                    : 'button-group'
                                            }
                                        >
                                            {userChecked
                                                ? 'Send to the user'
                                                : 'Send to the group'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default Share
