import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import PageNotFound from '../pages/PageNotFound'
function RestrictedNavbar({ children }) {
    const location = useLocation()
    // const [showPageNotFound, setPageNotFound] = useState(false)
    const [navbarShow, setNavbarShow] = useState(false)
    useEffect(() => {
        console.log('this is where we are: ', location)
        if (location.pathname === '/LogIn' || location.pathname === '/') {
            setNavbarShow(false)
        } else {
            setNavbarShow(true)
        }
        // if (location.pathname === '*') setPageNotFound(true)
        // else setPageNotFound(false)
    }, [location])
    return <div>{navbarShow && children}</div>
}

export default RestrictedNavbar
