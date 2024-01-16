import React from 'react'

function Group() {
    return (
        <>
            <div className="page-container">
                <div className="group-name">
                    <h3 className="group-name-text">Group Name</h3>
                </div>
                <div className="add-member">
                    <button type="button" className="btn-add-member">
                        Add a new member
                    </button>
                </div>
                <div className="break"></div>
                <div className="notes-container"></div>
            </div>
        </>
    )
}

export default Group
