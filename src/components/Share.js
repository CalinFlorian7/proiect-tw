import React from 'react'
import './Share.css'
import { useState } from 'react'
function Share({ onClose, noteId, noteTitle, subjectId }) {
    const [userChecked, setUserChecked] = useState(true)
    const [groupChecked, setGroupChecked] = useState(false)
    const [email, setEmail] = useState('')
    const handleUserChecked = () => {
        if (!userChecked) {
            setUserChecked(!userChecked)
            setGroupChecked(!groupChecked)
        }
    }
    const handleShareSubmit = () => {
        console.log('click')
        if (userChecked) {
            console.log('email', email)
        } else if (groupChecked) {
            console.log('group')
        }
    }
    const handleGroupChecked = () => {
        if (!groupChecked) {
            setGroupChecked(!groupChecked)
            setUserChecked(!userChecked)
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
                                                ></select>
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
