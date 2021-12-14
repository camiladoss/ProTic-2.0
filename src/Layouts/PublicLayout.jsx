import React from 'react'
import Navbar from 'components/Navbar';
import {Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PublicLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet />
            <ToastContainer position="bottom-center" />
        </div>
    )
}

export default PublicLayout
