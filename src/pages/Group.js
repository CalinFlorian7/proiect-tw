import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
function Group() {
    const location = useLocation()
    let membership = []
    membership = location.state.membership
    console.log('---', membership)
    useEffect(() => {
        // console.log('name', membership.Group.User.group_name)
    }, [])
    const user_id = parseInt(localStorage.getItem('userId'))
    const admin = user_id === membership.Group.User.user_id
    console.log('id localStorage.getItem', user_id)
    console.log(
        'id membership.Group.User.user_id',
        membership.Group.User.user_id
    )
    console.log('admin', admin)
    return (
        <>
            <div className="page-container">
                <div className="membership-container">
                    <div className="membership-name">
                        <h3 className="membership-name-text">
                            {membership.Group.group_name}
                        </h3>
                    </div>

                    {/* <div className="membership-join">
                        <button type="button" className="btn-join-group">
                            Delete
                        </button>
                    </div> */}
                    <div className="group-creator-container">
                        <div className="group-creator">
                            <h3>Creator: </h3>

                            <h3 className="group-creator-text">
                                {membership.Group.User.user_name}
                            </h3>
                        </div>
                    </div>
                </div>

                {admin ? (
                    <div className="add-member">
                        <button type="button" className="btn-add-member">
                            Add a new member
                        </button>
                    </div>
                ) : (
                    <div>nu esti tu</div>
                )}

                <div className="break"></div>
                <div className="notes-container"></div>
            </div>
        </>
    )
}

export default Group
