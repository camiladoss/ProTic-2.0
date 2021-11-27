import React, { useEffect } from 'react'
import Navbar from 'components/Navbar'
import {Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from 'context/authContext';
import { useMutation } from '@apollo/client';
import { REFRESH_TOKEN } from 'graphql/auth/mutations';
import { useNavigate } from "react-router-dom";

const PrivateLayout = () => {
    const navigate = useNavigate();
    const { authToken, setToken } = useAuth();

    const [ refreshToken, { data: dataMutation, loading: loadingMutation, error: errorMutation } ] =
    useMutation(REFRESH_TOKEN);

    useEffect(()=>{
        refreshToken();
    },[refreshToken]);

    useEffect(()=>{
        console.log(dataMutation);
        if (dataMutation){
            if (dataMutation.refreshToken.token){
                setToken(dataMutation.refreshToken.token);
            } else {
                setToken(null);
                navigate('/auth/login');
            }
        }
    }, [dataMutation, setToken, navigate])

    if (loadingMutation) return (<div>Loading...</div>);


    return (
        <div>
            <Navbar />
            <Outlet className="w-full"/>
            <ToastContainer position="bottom-center" />
        </div>
    )
}

export default PrivateLayout
