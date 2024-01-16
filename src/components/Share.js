import React from 'react'
import './Share.css'

function Share({ onClose }) {
    return (
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
                                Sharedsabhd dsdhbsahd sdbshabdhsab
                                dashdhsabdhbas
                            </h2>
                            <h3>dadasdsdskdjsandjsanjdnsajknds</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Share
