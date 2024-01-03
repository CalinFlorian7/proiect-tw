import React from 'react'
import '../pages/Groups.css'
function Groups() {
    return (
        <>
            <div className="page-container">
                Groups
                <div className="button-add-group">
                    <div className="add-group">
                        <button type="button" className="btn-add-group">
                            Add a new group
                        </button>
                    </div>
                    <div className="break"></div>
                </div>
            </div>
        </>
    )
}

export default Groups
