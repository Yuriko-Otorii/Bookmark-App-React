import React, { useEffect, useState } from 'react'

import { doc, getDoc } from 'firebase/firestore'

import homeStyle from '../styles/home.module.scss'
import { db } from '../firebase'

function Home() {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const userDocumentRef = doc(db, 'users', 'OnkGN7ete9ioN3y9FpKj')
    getDoc(userDocumentRef).then((documentSnapshot) => {
      const { username } = documentSnapshot.data()
      setUsername(username)
    })
  }, [])

  const getDate = new Date()
  const currTime = getDate.getHours()

  if (currTime >= 5 && currTime < 12) {
    return (
      <>
        <div className={homeStyle['Home-morning-background']}>
          <h1 className={homeStyle['Home-title']}>Good morning, {username}</h1>
        </div>
      </>
    )
  } else if (currTime >= 12 && currTime < 19) {
    return (
      <>
        <div className={homeStyle['Home-noon-background']}>
          <h1 className={homeStyle['Home-title']}>Hello, {username}</h1>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={homeStyle['Home-night-background']}>
          <h1 className={homeStyle['Home-title']}>Good evening, {username}</h1>
        </div>
      </>
    )
  }
}

export default Home
