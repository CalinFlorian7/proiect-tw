import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
// import { IoIosClose } from 'react-icons/io'
import { SidebarDataStudent, SidebarDataTeacher } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'
import UserMenu from './UserMenu'
import { useLocation } from 'react-router-dom'
function Navbar() {
    const location = useLocation()
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
            <IconContext.Provider value={{ color: 'cyan' }}>
                <div className="navbar">
                    {/* <Link to="#" className="menu-bars"> */}
                    <span
                        // to={location}
                        onClick={console.log('locatie menu!!!:', location)}
                        className="menu-bars"
                    >
                        <FaIcons.FaBars onClick={showSidebar} />
                    </span>
                    <div className="menu-container">
                        <UserMenu />
                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            {/* <Link to="#" className="menu-bars"> */}
                            <span
                                // to={location}
                                className="menu-bars"
                            >
                                <AiIcons.AiOutlineClose />
                            </span>
                        </li>

                        {localStorage.getItem('userType') === 'student'
                            ? SidebarDataStudent.map((item, index) => {
                                  return (
                                      <li key={index} className={item.cName}>
                                          <Link to={item.path}>
                                              {item.icon}
                                              <span>{item.title}</span>
                                          </Link>{' '}
                                      </li>
                                  )
                              })
                            : SidebarDataTeacher.map((item, index) => {
                                  return (
                                      <li key={index} className={item.cName}>
                                          <Link to={item.path}>
                                              {item.icon}
                                              <span>{item.title}</span>
                                          </Link>{' '}
                                      </li>
                                  )
                              })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
