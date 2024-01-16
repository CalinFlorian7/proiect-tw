import React from 'react'
import './Share.css'

function Share({ onClose }) {
    return (
        <>
            <div className="overlay">
                <div className="overlay-background" onClick={onClose}></div>
                <div className="overlay-container">
                    <div className="overlay-content">
                        <button
                            className="overlay-close"
                            type="button"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Share
