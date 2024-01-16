import React from 'react'
import './Share.css'
import { useState } from 'react'
function Share({ onClose, noteId, noteTitle, subjectId }) {
    const [userChecked, setUserChecked] = useState(true)
    const [groupChecked, setGroupChecked] = useState(false)
    const handleUserChecked = () => {
        setUserChecked(!userChecked)
        setGroupChecked(!groupChecked)
    }
    const handleGroupChecked = () => {
        setGroupChecked(!groupChecked)
        setUserChecked(!userChecked)
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
