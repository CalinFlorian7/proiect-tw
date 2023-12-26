import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as TbIcons from 'react-icons/tb'
import * as MdIcons from 'react-icons/md'
import * as CgIcons from 'react-icons/cg'
export const SidebarDataStudent = [
    {
        title: 'Home',
        path: '/Home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
    },
    {
        title: 'Notes',
        path: '/Notes',
        icon: <TbIcons.TbNote />,
        cName: 'nav-text',
    },
    {
        title: 'Add note',
        path: '/AddNote',
        icon: <TbIcons.TbNote />,
        cName: 'nav-text',
    },
    {
        title: 'Subjects',
        path: '/Subjects',
        icon: <TbIcons.TbNote />,
        cName: 'nav-text',
    },
    {
        title: 'Groups',
        path: '/Groups',
        icon: <MdIcons.MdGroups />,
        cName: 'nav-text',
    },
    {
        title: 'Profile',
        path: '/Profile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text',
    },
    {
        title: 'Settings',
        path: '/Settings',
        icon: <IoIcons.IoMdSettings />,
        cName: 'nav-text',
    },
    {
        title: 'Sign Off',
        path: '/LogIn',
        icon: <FaIcons.FaSignOutAlt />,
        cName: 'nav-text',
    },
]
export const SidebarDataTeacher = [
    {
        title: 'Home',
        path: '/Home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
    },
    {
        title: 'Subjects',
        path: '/Subjects',
        icon: <TbIcons.TbNote />,
        cName: 'nav-text',
    },
    {
        title: 'Add subject',
        path: '/AddSubject',
        icon: <TbIcons.TbNote />,
        cName: 'nav-text',
    },

    {
        title: 'Profile',
        path: '/Profile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text',
    },
    {
        title: 'Settings',
        path: '/Settings',
        icon: <IoIcons.IoMdSettings />,
        cName: 'nav-text',
    },
    {
        title: 'Sign Off',
        path: '/LogIn',
        icon: <FaIcons.FaSignOutAlt />,
        cName: 'nav-text',
    },
]
