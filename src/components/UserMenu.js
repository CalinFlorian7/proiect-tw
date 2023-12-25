import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './UserMenu.css'
import { RiArrowDownSFill } from 'react-icons/ri'
import { useState } from 'react'
import defalutImage from '../Images/defaultProfilePicture.jpg'

function UserMenu() {
    const [image, setImage] = useState(defalutImage)

    useEffect(() => {
        if (localStorage.getItem('userType') === 'student') {
            const id = localStorage.getItem('userId')
            console.log('id student pt user menu: ', id)
            const fechUserNameImage = async () => {
                const response = await fetch(
                    'http://localhost:8080/api/users/selectUserNameImage',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },

                        body: JSON.stringify({
                            id: localStorage.getItem('userId'),
                        }),
                    }
                ).catch((err) => {
                    console.log(err)
                })
                const data = await response.json()
                if (response.status === 500) {
                    console.log('server error')
                }
                if (response.status === 200 && data !== null) {
                    console.log(data)

                    if (data.user_name !== null)
                        document.querySelector('.user-name').innerHTML =
                            data.user_name
                    if (data.user_image !== null) {
                        try {
                            console.log(
                                'data image is not null for the user menu image'
                            )
                            console.log(
                                'data image from db for user_menu: ',
                                data.user_image
                            )
                            console.log('image type: ', typeof data.user_image)
                            // const imageUrl = `url("${data.user_image}")`
                            setImage(data.user_image)
                            // console.log('image url: ', imageUrl)
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        console.log('data image is null for the user menu')
                    }
                }
            }
            fechUserNameImage()
        } else if (localStorage.getItem('userType') === 'teacher') {
            const id = localStorage.getItem('userId')
            console.log('id teacher pt user menu: ', id)
            const fecthTeacherNameImage = async () => {
                const response = await fetch(
                    'http://localhost:8080/api/teachers/selectTeacherNameImage',
                    {
                        method: 'POST',

                        headers: {
                            authorization: `Bearer ${localStorage.getItem(
                                'accessToken'
                            )}`,
                            'Content-Type': 'application/json',
                        },

                        body: JSON.stringify({
                            id: localStorage.getItem('userId'),
                        }),
                    }
                ).catch((err) => {
                    console.log(err)
                })
                const data = await response.json()
                if (response.status === 500) {
                    console.log('server error')
                }
                if (response.status === 200 && data !== null) {
                    console.log(data)

                    if (data.user_name !== null)
                        document.querySelector('.user-name').innerHTML =
                            data.user_name
                    if (data.user_image !== null) {
                        try {
                            console.log(
                                'data image is not null for the user menu image'
                            )
                            console.log(
                                'data image from db for user_menu: ',
                                data.user_image
                            )
                            console.log('image type: ', typeof data.user_image)
                            const imageUrl = `url("${data.user_image}")`
                            setImage(imageUrl)
                            // console.log('image url: ', imageUrl)
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        console.log('data image is null for the user menu')
                    }
                }
            }
            fecthTeacherNameImage()
        }
    }, [])

    return (
        <div className="container-menu-components">
            {localStorage.getItem('userType') === 'student' ? (
                <Link to="/AddNote">
                    <div className="add-note">
                        <span className="add-note-icon"></span>
                        <span className="button-add">Add Note</span>
                    </div>
                </Link>
            ) : (
                <Link to="/AddSubject">
                    <div className="add-note">
                        <span className="add-note-icon"></span>
                        <span className="button-add">Add Subject</span>
                    </div>
                </Link>
            )}
            <Link to="/Profile">
                <div className="user-menu">
                    <span className="user-image">
                        <img
                            className="img"
                            width="30"
                            height="30"
                            src={image}
                            alt=" "
                        />
                    </span>
                    <span className="user-name">User Name</span>
                    <span className="user-arrow"></span>
                    <RiArrowDownSFill></RiArrowDownSFill>
                </div>
            </Link>
        </div>
    )
}

export default UserMenu
