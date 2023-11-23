import React from 'react'
import { Link } from 'react-router-dom'
import './UserMenu.css'
import { RiArrowDownSFill } from 'react-icons/ri'
import defalutImage from '../Images/defaultProfilePicture.jpg'
function UserMenu() {
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
