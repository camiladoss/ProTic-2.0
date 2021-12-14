import React from 'react'
import {Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthLayout = () => {
    return (
        <div>
            <Outlet className="w-full"/>
            <ToastContainer position="bottom-center" />
        </div>
    )
}

export default AuthLayout
