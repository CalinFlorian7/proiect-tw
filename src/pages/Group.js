import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
function Group() {
    const location = useLocation()
    let groupId = null
    const [email, setEmail] = useState('')
    let membership = []
    membership = location.state.membership
    console.log('---', membership)
    groupId = membership.group_id
    console.log('groupId------', groupId)

    useEffect(() => {
        // console.log('name', membership.Group.User.group_name)
    }, [])
    const user_id = parseInt(localStorage.getItem('userId'))
    let admin = false
    if (user_id === membership.Group.User.user_id) {
        admin = true
    } else {
        admin = false
    }
    const handleAddMember = () => {
        if (email !== '') {
            insertMemberByEmail()
        }
    }

    const insertMemberByEmail = async (req, res) => {
        const response = await fetch(
            'http://localhost:8080/api/memberships/insertMemberByEmail',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    email: email,
                    group_id: membership.group_id,
                }),
            }
        )
        const data = await response.json()
        if (response.status === 200) {
            console.log('data was successfully inserted', data)
            alert('user successfully added')
        } else if (response.status === 500) {
            console.log('data was not successfully inserted')
            alert('user already added')
        } else if (response.status === 404) {
            console.log('user not found')
            alert("User doesn't exist")
        }
    }
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
                        <div className="form">
                            {' '}
                            <div className="add-member-container-form">
                                <label className="member-name">
                                    Member email:
                                </label>
                                <input
                                    type="text"
                                    defaultValue={email}
                                    onChange={(e) => {
                                        e.preventDefault()
                                        setEmail(e.target.value)
                                        // console.log(email)
                                    }}
                                ></input>
                                <button
                                    type="button"
                                    className="btn-add-member"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        console.log(email)
                                        handleAddMember()
                                    }}
                                >
                                    Add the member
                                </button>
                            </div>
                        </div>
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
