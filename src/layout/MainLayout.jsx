import React from 'react'
import Navigation from '../components/navigation/Navigation'

function MainLayout({children}) {
  return (
    <>
        <Navigation />
        {children}
    </>
  )
}

export default MainLayout