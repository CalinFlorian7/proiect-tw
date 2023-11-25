import './LogIn.css'
import { useState } from 'react'
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
    function validateUserName() {
        const UserEmailRegex = new RegExp(/@stud\.ase\.ro$/)
        const TeacherEmailRexex = new RegExp(/@ie\.ase\.ro$/)
        const SpaceRegex = new RegExp(/^\S+$/)

        if (
            ((UserEmailRegex.test(username) &&
                username.length > UserEmailRegex.source.length - 3) ||
                TeacherEmailRexex.test(username)) &&
            SpaceRegex.test(username)
        ) {
            return true
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
        if (action !== 'Log In')
            setUserType(
                e.target.value.includes('@ie.ase.ro') ? 'teacher' : 'student'
            )

        console.log(userType)
    }
    const handleLogInSubmit = () => {
        setUserType('student')
        console.log('username log in', username)
        if (action === 'Sign Up') {
            setAction('Log In')
            setUsername('')
            setPassword('')
            setMessageStatus('notTested')
            // setMessage('')
        } else {
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
                setMessage('Log In successful')
                setMessageStatus('success')
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
            console.log('username sign up ', username)
            // setUserType('student')
            console.log('user type: ', userType)
            console.log('username: ', username)
            if (name === '') {
                setMessage('Please enter your name')
                setMessageStatus('error')
            } else if (username === '') {
                setMessage('Please enter your username')
                setMessageStatus('error')
            } else if (validateUserName() === false) {
                setMessageStatus('error')
                setMessage('Please enter a valid email address')
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
                setMessage('Sign Up successful')
                setMessageStatus('success')
                // setAction('Log In')
                setPassword('')
                // setUserType('student')
                setUsername('')
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
                    {userType === 'teacher' ? (
                        <div
                            className={
                                userType === 'teacher'
                                    ? 'div-combo-container'
                                    : 'div-faculty'
                            }
                        >
                            <span className="label-span">Faculty:</span>
                            <select className="input-faculty">
                                <option value="ASE">???</option>
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
