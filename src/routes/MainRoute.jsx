import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AddForm from '../pages/AddForm'
import Home from '../pages/Home'
import List from '../pages/List'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import Navigation from '../components/navigation/Navigation'
import { AuthProvider } from '../AuthContext'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

function MainRoute() {
  return (
    <>
      <Navigation />

      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/addform"
            element={
              <PrivateRoute>
                <AddForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/list"
            element={
              <PrivateRoute>
                <List />
              </PrivateRoute>
            }
          />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default MainRoute
