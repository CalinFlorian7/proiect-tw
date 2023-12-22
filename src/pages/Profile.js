import React from 'react'
import defaultImage300 from '../Images/profilePicture300x300.png'
import '../pages/Profile.css'
import { FaRegEdit } from 'react-icons/fa'
import { IconContext } from 'react-icons'
function Profile() {
    return (
        <>
            <IconContext.Provider value={{ color: 'cyan' }}>
                <div className="page-container">
                    <div className="profile-container">
                        <h1>Profile</h1>
                        <div className="image-container">
                            <div id="profile-img">
                                <img
                                    className="profile-img"
                                    src={defaultImage300}
                                    width="200px"
                                    height="200px"
                                    alt="profile"
                                />
                            </div>
                            <div className="img-edit">
                                <button className="btn btn-primary">
                                    <FaRegEdit className="edit-icon" />
                                </button>
                            </div>
                        </div>

                        <div className="profile-info">
                            <div className="profile-info-data">
                                <h3>
                                    Username:
                                    <span className="span-name">Username</span>
                                </h3>
                                <h3>
                                    Email:
                                    <span className="span-email">Email</span>
                                </h3>

                                {localStorage.getItem('userType') ===
                                'student' ? (
                                    <h3>
                                        Notes:
                                        <span className="span-notes">
                                            Total notes
                                        </span>
                                    </h3>
                                ) : (
                                    <>
                                        <h3>
                                            Faculty:
                                            <span className="span-faculty">
                                                Total notes
                                            </span>
                                        </h3>
                                        <h3>
                                            Subjects:
                                            <span className="span-subjects">
                                                Total subjects
                                            </span>
                                        </h3>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </IconContext.Provider>
        </>
    )
}

export default Profile
