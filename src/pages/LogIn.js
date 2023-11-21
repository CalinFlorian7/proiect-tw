// import React,{useState} from 'react'
// import { Link } from 'react-router-dom'
import './LogIn.css'
// import SignUp from './SignUp'
function LogIn() {
    // const [singUp,showSignUp] = useState(false);
    // const showSignUp = () => setShowSignUp(!showSignUp);

    return (
        <div className="container">
            <div className="login">
                <span className="loginTitle">
                    Complete the form to log in :)
                </span>
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
                <button className="loginButton">Log In</button>
                <span className="label-span">Forgotten your password?</span>

                <span className="label-span">Don't have an account?</span>
                <button className="sign-up">Sign Up</button>
                {/* <Link to="/SignUp">Forgotten your password?</Link> */}
                {/* <Link to="/SignUp">Don't have an account? Sign Up</Link> */}
            </div>
        </div>
    )
}

export default LogIn
