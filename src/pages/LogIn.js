import './LogIn.css'
import { useState } from 'react'
// import App from '../App.js'
function LogIn() {
    const [action, setAction] = useState('Log In')

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
                    <div className="message-container">
                        <span className="message">eroare</span>
                    </div>
                    <span className="label-span">Username:</span>
                    <input
                        type="text"
                        className="input-username"
                        placeholder="Enter your username..."
                    />
                    <span className="label-span">Password:</span>
                    <input
                        type="password"
                        className="input-password"
                        placeholder="Enter your password..."
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
                            />
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <button
                        className={
                            action === 'Log In' ? 'submit-gray' : 'submit'
                        }
                        onClick={() => setAction('Log In')}
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
                        onClick={() => setAction('Sign Up')}
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
