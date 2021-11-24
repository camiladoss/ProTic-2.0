import React from 'react'
import Navbar from 'components/Navbar'
import {Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthLayout = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <Outlet className="w-full"/>
            <ToastContainer position="bottom-center" />
        </div>
    )
}

export default AuthLayout
