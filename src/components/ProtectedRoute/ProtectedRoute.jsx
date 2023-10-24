import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({loginData}) {
  return (
    <>
    {loginData?<Outlet/>:<Navigate to='login'/>}
    </>
  )
}
