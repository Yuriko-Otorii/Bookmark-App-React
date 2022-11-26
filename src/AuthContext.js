import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from './firebase';


const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState("")
    const value = {user}

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            // console.log(user);
            setUser(user)
        })
    
        return () => { unsubscribed() }
    }, [])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

