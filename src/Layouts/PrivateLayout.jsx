import React from 'react'
import Navbar from 'components/Navbar'
import {Outlet} from 'react-router-dom'

const PrivateLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet className="w-full"/>
        </div>
    )
}

export default PrivateLayout
