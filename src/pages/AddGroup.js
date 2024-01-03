import React from 'react'
import { useState } from 'react'

function AddGroup() {
    const [messageStatus, setMessageStatus] = useState('notTested')
    const [message, setMessage] = useState('')
    const [groupName, setGroupName] = useState('')
    const insertMember = async (groupId) => {
        const response = await fetch(
            'http://localhost:8080/api/memberships/insertMember',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group_id: groupId,
                    user_id: localStorage.getItem('userId'),
                }),
            }
        )
        const data = await response.json()
        if (response.status === 200) {
            setMessageStatus('success')
            setMessage('membership added successfully ')
            console.log('data was successfully inserted')
        } else if (response.status === 500) {
            setMessageStatus('error')
            setMessage(data.error)
            console.log('data was not successfully inserted')
        }
    }
    const insertGroup = async () => {
        const response = await fetch(
            'http://localhost:8080/api/groups/insertGroup',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group_name: groupName,
                    user_id: localStorage.getItem('userId'),
                }),
            }
        )
        const data = await response.json()
        if (response.status === 201) {
            setMessageStatus('success')
            setMessage(data.message)

            console.log('data was successfully inserted', data)
            console.log('id group', data.group.group_id)
            const input = document.getElementById('groupName')
            input.value = ''
            setGroupName('')
        } else if (response.status === 500) {
            setMessageStatus('error')
            setMessage(data.error)
            console.log('data was not successfully inserted')
        }
    }
    return (
        <>
            <div className="page-container">
                <div className="add-subject-container">
                    <h1>Add a group</h1>
                    <form className="subject-form" action="#">
                        <div className="main-form-container">
                            <div className="form-container">
                                {messageStatus === 'success' ? (
                                    <div
                                        className={
                                            messageStatus === 'notTested'
                                                ? 'message-container-none'
                                                : 'message-container'
                                        }
                                    >
                                        <span className="message-success">
                                            {message}
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            messageStatus === 'notTested'
                                                ? 'message-container-none'
                                                : 'message-container'
                                        }
                                    >
                                        <span className="message-error">
                                            {message}
                                        </span>
                                    </div>
                                )}
                                <div className="input-container">
                                    <label
                                        className="subject-label"
                                        htmlFor="subjectName"
                                    >
                                        Group Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="groupName"
                                        name="subjectName"
                                        onChange={(e) =>
                                            setGroupName(e.target.value)
                                        }
                                        placeholder="Enter the group name"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (groupName !== '') insertGroup()
                                        else {
                                            setMessageStatus('error')
                                            setMessage(
                                                'Please fill in all the fields'
                                            )
                                        }
                                    }}
                                >
                                    Add the group
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddGroup
