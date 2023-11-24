import './LogIn.css'
import { useState } from 'react'
// import App from '../App.js'
function LogIn() {
    const [action, setAction] = useState('Log In')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('')
    const handleLogInSubmit = () => {
        if (action === 'Sign Up') {
            setAction('Log In')
            setUsername('')
            setPassword('')
            // setMessage('')
        } else {
            if (username === '') {
                setMessage('Please enter your username')
                setMessageStatus('error')
            } else if (password === '') {
                setMessage('Please enter your password')
                setMessageStatus('error')
            } else {
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

            setPasswordConfirmation('')
        } else {
            if (username === '') {
                setMessage('Please enter your username')
                setMessageStatus('error')
            } else if (password === '') {
                setMessage('Please enter your password')
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
                setAction('Log In')
                setPassword('')
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
                <div className="login">
                    <span className="loginTitle">{action}</span>
                    {messageStatus === 'success' ? (
                        <div className="message-container">
                            <span className="message-success">{message}</span>
                        </div>
                    ) : (
                        <div className="message-container">
                            <span className="message-error">{message}</span>
                        </div>
                    )}
                    {/* <div className="message-container">
                        <span className="message">eroare</span>
                    </div> */}
                    <span className="label-span">Username:</span>
                    <input
                        type="text"
                        className="input-username"
                        placeholder="Enter your username..."
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
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
