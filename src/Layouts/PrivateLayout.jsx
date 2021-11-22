import React from 'react'
import Navbar from 'components/Navbar'
import {Outlet} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet className="w-full"/>
        </div>
    )
}

export default PrivateLayout
