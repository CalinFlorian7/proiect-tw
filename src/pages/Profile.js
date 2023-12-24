import React from 'react'
import defaultImage300 from '../Images/profilePicture300x300.png'
import '../pages/Profile.css'
// import { FaRegEdit } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { useState } from 'react'

function Profile() {
    const [image, setImage] = useState(defaultImage300)

    const sendStudentImage = async (image) => {
        console.log('image: ' + image)

        const response = await fetch(
            'http://localhost:8080/api/users/updateUserImage',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,

                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: image,
                    id: localStorage.getItem('userId'),
                }),
            }
        )
        const data = await response.json()
        console.log(data)
        if (response.status === 200) {
            console.log('success updating image')
        } else if (response.status === 500) {
            console.log('error updating image')
        }
    }

    return (
        <>
            <IconContext.Provider value={{ color: 'cyan' }}>
                <div className="page-container">
                    <div className="profile-container">
                        <h1>Profile</h1>
                        <div className="image-container">
                            <div id="profile-img">
                                <input
                                    id="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                        const file = event.target.files[0]
                                        if (file instanceof Blob) {
                                            console.log('e blob')
                                        } else console.log('nu e blob')
                                        const reader = new FileReader()
                                        if (
                                            file instanceof Blob &&
                                            file !== null
                                        ) {
                                            reader.onload = (e) => {
                                                console.log(
                                                    'token cand se incarca imaginea:',
                                                    localStorage.getItem(
                                                        'accessToken'
                                                    )
                                                )
                                                setImage(e.target.result)

                                                if (
                                                    localStorage.getItem(
                                                        'userType'
                                                    ) === 'student'
                                                ) {
                                                    // sendStudentImage(file)
                                                }
                                            }
                                        } else console.log('nu e blob fis ales')
                                        reader.readAsDataURL(file)
                                        reader.onloadend = () => {
                                            if (
                                                localStorage.getItem(
                                                    'userType'
                                                ) === 'student'
                                            ) {
                                                sendStudentImage(reader.result)
                                            }
                                        }
                                    }}
                                />
                                <img
                                    className="profile-img"
                                    src={image}
                                    width="200px"
                                    height="200px"
                                    alt="profile"
                                />
                            </div>
                            {/* <div className="img-edit">
                                <button className="btn btn-primary">
                                    <FaRegEdit className="edit-icon" />
                                </button>
                            </div> */}
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
