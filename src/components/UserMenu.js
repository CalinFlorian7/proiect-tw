import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './UserMenu.css'
import { RiArrowDownSFill } from 'react-icons/ri'

import defalutImage from '../Images/defaultProfilePicture.jpg'
function UserMenu() {
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
                    document.querySelector('.user-name').innerHTML =
                        data[0].user_name
                    if (data[0].user_image !== null)
                        document.querySelector('.user-image img').src =
                            data[0].user_image
                }
            }
            fechUserNameImage()
        }
    }, [])

    return (
        <div className="container-menu-components">
            <Link to="/Profile">
                <div className="user-menu">
                    <span className="user-image">
                        <img src={defalutImage} alt=" " />
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
