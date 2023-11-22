import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// import LogIn from './pages/LogIn'
// import RestrictedNavbar from './components/RestrictedNavbar'
const useAuthorization = () => {
    const user = { loggedIn: true }
    return user && user.loggedIn
}
function ProtectedRoutes() {
    const isAuthorized = useAuthorization()

    return isAuthorized ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
