import './LogIn.css'
import { useEffect, useState } from 'react'
// import App from '../App.js'
function LogIn() {
    const [action, setAction] = useState('Log In')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('notTested')
    const [name, setName] = useState('')
    const [userType, setUserType] = useState('student')
    const [faculties, setFaculties] = useState([])
    const [facultyId, setFacultyId] = useState('Facula')
    const [user_id, setUser_id] = useState('')

    // const [backendData, setMessageBackendData] = useState({})
    useEffect(() => {
        // console.log('esti in func useEffect')
        // fetch('http://localhost:5000/api')
        //     .then((res) => res.json())
        //     .then((data) => console.log(data))
        //     .catch((error) => console.log(error))
        // /api/faculties/getAllFaculties
        const fetchData = async () => {
            try {
                const response = await fetch('/api/faculties/getAllFaculties')
                const data = await response.json()
                console.log(data)
                setFaculties(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    const sendDataStudent = async () => {
        const response = await fetch(
            'http://localhost:8080/api/users/insertUser',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_name: name,
                    user_email: username,
                    user_password: password,
                }),
            }
        ).catch((error) => console.log(error))
        console.log('Sending data to backend: ', name, username, password)
        const data = await response.json()
        console.log('data from backend: ', data)
        if (data.error === 'SequelizeUniqueConstraintError') {
            setMessage(
                'The email address is already in use by another account.'
            )
            setMessageStatus('error')
        }
        // setMessageBackendData(data)
    }

    const authenticateUser = async () => {
        await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                id: user_id,
                user_type: userType,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.access_token)
                localStorage.setItem('accessToken', data.access_token)
                // Do something with the access token
            })
            .catch((error) => console.log(error))
    }

    const getTeacherId = async () => {
        const response = await fetch(
            'http://localhost:8080/api/teachers/selectTeacherId',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teacher_email: username,
                    teacher_password: password,
                }),
            }
        ).catch((error) => console.log(error))
        console.log('Sending data to backend: ', username, password)
        const data = await response.json()
        console.log('data from backend: ', data)
        if (response.status === 200) {
            console.log('user id from database:', data.id)
            setUser_id(data.id)
            authenticateUser()
            console.log(
                'token din local storrage: ',
                localStorage.getItem('accessToken')
            )
        } else if (response.status === 404) {
            setMessage('User not found')
            setMessageStatus('error')
        } else if (response.status === 500) {
            setMessage('Error selecting user ID')
            setMessageStatus('error')
        }
        // setMessageBackendData(data)
    }
    const getStudentId = async () => {
        const response = await fetch(
            'http://localhost:8080/api/users/selectUserId',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_email: username,
                    user_password: password,
                }),
            }
        ).catch((error) => console.log(error))
        console.log('Sending data to backend: ', username, password)
        const data = await response.json()
        console.log('data from backend: ', data)
        if (response.status === 200) {
            setUser_id(data.id)
            console.log('user id from database:', data.id)
            authenticateUser()
            console.log(
                'token din local storrage: ',
                localStorage.getItem('accessToken')
            )
        } else if (response.status === 404) {
            setMessage('User not found')
            setMessageStatus('error')
        } else if (response.status === 500) {
            setMessage('Error selecting user ID')
            setMessageStatus('error')
        }
        // setMessageBackendData(data)
    }
    const sendDataTeacher = async () => {
        const response = await fetch(
            'http://localhost:8080/api/teachers/insertTeacher',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teacher_name: name,
                    teacher_email: username,
                    teacher_password: password,
                    faculty_id: facultyId,
                }),
            }
        ).catch((error) => console.log(error))
        console.log(
            'Sending data to backend: ',
            name,
            username,
            password,
            facultyId
        )
        const data = await response.json()
        console.log('data from backend: ', data)
        if (data.error === 'SequelizeUniqueConstraintError') {
            setMessage(
                'The email address is already in use by another account.'
            )
            setMessageStatus('error')
        }
        // setMessageBackendData(data)
    }
    function validateUserName() {
        const UserEmailRegex = new RegExp(/^[a-zA-Z0-9]+@stud\.ase\.ro$/)

        const TeacherEmailRegex = new RegExp(/^[a-zA-A0-9]+@ie\.ase\.ro$/)
        // const SpaceRegex = new RegExp(/^\S+$/)

        // if (SpaceRegex.test(username))
        if (UserEmailRegex.test(username) || TeacherEmailRegex.test(username)) {
            console.log('email corect!')
            return true
        }
        console.log('email gresit!')
        return false
    }
    function validateFaculty() {
        const select = document.querySelector('.input-faculty')
        const options = document.querySelectorAll('option')
        // console.log('number of selected options: ', options.length)
        for (let i = 0; i < options.length; i++) {
            // console.log('option: ', options[i].value)
            // console.log('key: ', options[i].key)
            if (options[i].value === select.value) {
                // console.log('faculty id: ', options[i].value)
                setFacultyId(options[i].value)
                return true
            }
        }
        if (userType === 'teacher')
            if (select.value === '') {
                setMessage('A server error occurred. Please try again later.')
                setMessageStatus('error')
                return false
            }
        return false
    }

    function ValidatePassword() {
        const PasswordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

        if (PasswordRegex.test(password)) {
            return true
        }

        return false
    }
    const usernameChange = (e) => {
        setUsername(e.target.value)
        // setUserType('student')
        console.log(action)
        if (action !== 'Log In' || action === 'Log In')
            setUserType(
                e.target.value.includes('@ie.ase.ro') ? 'teacher' : 'student'
            )

        console.log(userType)
    }
    const handleLogInSubmit = () => {
        // setUserType('student')
        console.log('username log in', username)
        if (action === 'Sign Up') {
            setAction('Log In')
            setUsername('')
            setPassword('')
            setMessageStatus('notTested')
            // setMessage('')
        } else {
            console.log('usertype log in', userType)
            if (username === '') {
                setMessage('Please enter your username')
                setMessageStatus('error')
            } else if (validateUserName() === false) {
                setMessageStatus('error')
                setMessage('Please enter a valid email address')
            } else if (password === '') {
                setMessage('Please enter your password')
                setMessageStatus('error')
            }
            //      else if (ValidatePassword() === false) {
            //     setMessage('The passsword is not strong enough')
            //     setMessageStatus('error')
            // }
            else {
                if (userType === 'student') getStudentId()
                if (userType === 'teacher') {
                    console.log('user type tacher shoul work', userType)
                    getTeacherId()
                }
            }
        }
    }
    const handleSignUpSubmit = () => {
        if (action === 'Log In') {
            setAction('Sign Up')
            setUsername('')
            setPassword('')
            // setUserType('student')
            setMessageStatus('notTested')
            setName('')
            setPasswordConfirmation('')
        } else {
            console.log('ai apasat pe sign upppppppppppppppppp')
            console.log('username sign up ', username)
            // setUserType('student')
            console.log('user type:', userType)
            console.log('username: ', username)
            if (name === '') {
                setMessage('Please enter your name')
                setMessageStatus('error')
            } else if (username === '') {
                setMessage('Please enter your username')
                setMessageStatus('error')
            } else if (validateUserName() === false) {
                console.log('se verifica email')
                setMessageStatus('error')
                setMessage('Please enter a valid email address')
            } else if (userType === 'teacher' && validateFaculty() === false) {
                // if (validateFaculty() === false) {
                //     setMessageStatus('error')
                //     setMessage('Please select a faculty')
                //     // console.log('faculty id: ', facultyId)
                // }

                setMessageStatus('error')
                setMessage('Please select a faculty')
            } else if (password === '') {
                setMessage('Please enter your password')
                setMessageStatus('error')
            } else if (ValidatePassword() === false) {
                setMessage('The passsword is not strong enough')
                setMessageStatus('error')
            } else if (passwordConfirmation === '') {
                setMessage('Please confirm your password')
                setMessageStatus('error')
            } else if (password !== passwordConfirmation) {
                setMessage('Passwords do not match')
                setMessageStatus('error')
            } else {
                console.log('se trimite datele')
                setMessage('Sign Up successful')
                setMessageStatus('success')
                if (userType === 'student') sendDataStudent()
                console.log('user type dupa validari: ', userType)
                if (userType === 'teacher') {
                    console.log(' ar trebui sa send data teacher')
                    sendDataTeacher()
                }
                // setPassword('')
                // setUsername('')
                // setPasswordConfirmation('')
                // setName('')
            }
        }
    }
    return (
        <>
            <div className="container">
                {/* <form
                    className="sdas"
                    // {
                    // action === 'Log In' ? 'form-Log-In' : 'form-Sign-Up'
                    // }
                > */}
                {/* {messageStatus === 'notTested'
                    ? 'message-container-none'
                    : 'message-container'} */}
                <div className="login">
                    <span className="loginTitle">{action}</span>
                    {messageStatus === 'success' ? (
                        <div
                            className={
                                messageStatus === 'notTested'
                                    ? 'message-container-none'
                                    : 'message-container'
                            }
                        >
                            <span className="message-success">{message}</span>
                        </div>
                    ) : (
                        <div
                            className={
                                messageStatus === 'notTested'
                                    ? 'message-container-none'
                                    : 'message-container'
                            }
                        >
                            <span className="message-error">{message}</span>
                        </div>
                    )}

                    {action === 'Sign Up' ? (
                        <div className="div-password-confirmation">
                            <span className="label-span">Name:</span>
                            <input
                                className="input-name"
                                type="text"
                                placeholder="Enter your name..."
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            ></input>
                        </div>
                    ) : (
                        <div></div>
                    )}

                    <span className="label-span">Username:</span>
                    <input
                        type="text"
                        className="input-username"
                        placeholder="Enter your username..."
                        value={username}
                        onChange={usernameChange}

                        // onChange={(e) =>
                        //     setUsername(e.target.value) &&
                        //     setUserType(
                        //         e.target.value.includes('@ie.ase.ro')
                        //             ? 'teacher'
                        //             : 'student'
                        //     )
                        // }
                    />
                    {userType === 'teacher' && action === 'Sign Up' ? (
                        <div
                            className={
                                userType === 'teacher'
                                    ? 'div-combo-container'
                                    : 'div-faculty'
                            }
                        >
                            <span className="label-span">Faculty:</span>

                            <select
                                className="input-faculty"
                                value={facultyId}
                                onChange={(e) => setFacultyId(e.target.value)}
                            >
                                {/* <option value="ASE">???</option> */}

                                {faculties.map((faculty) => (
                                    // console.log('faculty: ', faculty),
                                    <option
                                        value={faculty.faculty_id}
                                        key={faculty.faculty_id}
                                    >
                                        {faculty.faculty_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <span className="label-span">Password:</span>
                    <input
                        type="password"
                        className="input-password"
                        placeholder="Enter your password..."
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {action === 'Sign Up' ? (
                        <div className="div-password-confirmation">
                            <span className="label-span">
                                Confirm Password:
                            </span>
                            <input
                                className="input-password-confiramtion"
                                type="password"
                                placeholder="Confirm your password..."
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                                value={passwordConfirmation}
                            />
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <button
                        className={
                            action === 'Log In' ? 'submit-gray' : 'submit'
                        }
                        onClick={handleLogInSubmit}
                        // onClick={() => setAction('Log In')}
                    >
                        Log In
                    </button>
                    {action === 'Sign Up' ? (
                        <div></div>
                    ) : (
                        <div className="div-span">
                            <span className="label-span">
                                Forgotten your password?
                            </span>
                            <span className="label-span">
                                Don't have an account?
                            </span>
                        </div>
                    )}

                    <button
                        className={
                            action === 'Sign Up' ? 'submit-gray' : 'submit'
                        }
                        onClick={handleSignUpSubmit}
                    >
                        Sign up
                    </button>
                    {/* <Link to="/SignUp">Forgotten your password?</Link> */}
                    {/* <Link to="/SignUp">Don't have an account? Sign Up</Link> */}
                </div>
                {/* </form> */}
            </div>
        </>
    )
}

export default LogIn
