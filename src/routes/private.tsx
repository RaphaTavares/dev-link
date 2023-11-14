import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

interface PrivateProps{
    children: ReactNode;
}

export function Private({ children }: PrivateProps): any{
    
    const [loading, setLoading] = useState(true);
    const [isSigned, setIsSigned] = useState(false);
    
    useEffect(() => {
      
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                };

                localStorage.setItem("@reactlinks", JSON.stringify(userData));
                setLoading(false);
                setIsSigned(true);
            }
            else{
                setLoading(false);
                setIsSigned(false);
            }
        })

        return () => {
            unsub();
        }

    }, [])
    
    if(loading){
        return <div></div>
    }

    if(!isSigned){
        return <Navigate to="/login"/>
    }

    return children;
}