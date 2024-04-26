import React from 'react'
import SideBarKhusus from '../sidebar/SideBarKhusus'
import HeaderKhusus from '../header/HeaderKhusus'

function LayoutKhusus({children, breadcrumbs}) {
  return (
    <div className='flex'>
        <SideBarKhusus />
        <div className='w-screen'>
            <HeaderKhusus breadcrumbs={breadcrumbs}/>
            {children}
        </div>
    </div>
  )
}

export default LayoutKhusus