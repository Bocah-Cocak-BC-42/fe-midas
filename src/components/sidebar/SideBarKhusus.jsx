import React from 'react'
import Logo from './../../assets/Logo-Midas.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck, faCircleUser, faServer } from '@fortawesome/free-solid-svg-icons'

const sidebar = [
    {
        name: "Verifikasi Kredit",
        icon: faClipboardCheck,
        key: 0
    },
    {
        name: "User Management",
        icon: faCircleUser,
        key: 1
    },
    {
        name: "Data Master",
        icon: faServer,
        key: 2,
        children: [
            {
                name: "Role"
            },
            {
                name: "Kantor Cabang"
            },
            {
                name: "Sektor Usaha"
            },
            {
                name: "Alamat"
            },
            {
                name: "Bank"
            }
        ]
    }
]

const mapSideBar = () => {
    let mapedSideBar = [];
    sidebar.map(item => {
        mapedSideBar.push(
            <li key={item.key} className='w-full p-2 cursor-pointer focus:border-r-8 hover:text-[#C07F00] hover:border-r-8 focus:border-r-[#C07F00] hover:border-r-[#C07F00] hover:bg-slate-200'>
            <FontAwesomeIcon className='px-2 w-4' icon={item.icon} /> 
            {item.name}
            </li>
        )
    })
    return mapedSideBar;
}


function SideBarKhusus() {
  return (
    
    <div className='flex flex-col shadow-lg h-screen w-1/5 items-center gap-5'>
        <div className='w-10/12 pt-5'>
            <img src={Logo}></img>
        </div>
        <div className='sidebar w-full'>
            <ul className='list-none'>
                {mapSideBar()}
            </ul>
        </div>
    </div>
  )
}

export default SideBarKhusus