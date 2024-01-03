import React from 'react'
import '../pages/Groups.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCallback } from 'react'
function Groups() {
    const [memberships, setMemberships] = useState([])
    const getMemberships = useCallback(async () => {
        const response = await fetch(
            'http://localhost:8080/api/memberships/getMemberships',
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
    }, [])
    useEffect(() => {
        getMemberships()
    }, [getMemberships])

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
                    <div className="memberships-container">
                        {memberships && memberships.length > 0 ? (
                            memberships.map((membership) => (
                                <div className="membership-container">
                                    <div className="membership-name">
                                        {membership.group_name}
                                    </div>

                                    <div className="membership-join">
                                        <button
                                            type="button"
                                            className="btn-join-group"
                                        >
                                            <Link to={`/Group`}>Join</Link>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-memberships">
                                You are not a member of any groups
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Groups
