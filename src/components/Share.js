import React from 'react'
import './Share.css'
function Share(isOpen, onClose, children) {
    return (
        <>
            {isOpen ? (
                <div className="overlay">
                    <div className="overlay-background" onClick={onClose}></div>
                    <div className="overlay-container">
                        <div className="overlay-content">
                            <button
                                className="overlay-close"
                                type="button"
                                onClick={onClose}
                            >
                                X
                            </button>
                        </div>
                        <div className="overlay-body">{children}</div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Share
