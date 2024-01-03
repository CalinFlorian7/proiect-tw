import React from 'react'
import '../pages/Groups.css'
import { Link } from 'react-router-dom'
function Groups() {
    return (
        <>
            <div className="page-container">
                Groups
                <div className="button-add-group">
                    <div className="add-group">
                        <button type="button" className="btn-add-group">
                            <Link to="/AddGroup">Add a new group</Link>
                        </button>
                    </div>
                    <div className="break"></div>
                </div>
            </div>
        </>
    )
}

export default Groups
