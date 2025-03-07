import React from 'react'
import routes from './router/routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Toast from './components/Toast/Toast'

export default function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={routes} />
        <Toast />
      </AuthProvider>
    </>
  )
}
