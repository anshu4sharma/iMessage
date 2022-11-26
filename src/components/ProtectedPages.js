import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const ProtectedPages = () => {
    const authToken = localStorage.getItem('authtoken')
    return (
        authToken ? <Outlet /> : <Navigate to={'/'} />
    )
}

export default ProtectedPages