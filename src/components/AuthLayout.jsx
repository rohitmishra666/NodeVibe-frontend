import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Skeleton } from "@/components/ui/skeleton"

function AuthLayout({authentication, children}) {
    const [loading, setLoading] = useState(true)   
    const navigate = useNavigate()
    const userStatus = useSelector((state)=>state.auth.status)

    useEffect(()=>{
        if(authentication && userStatus!==authentication){
            navigate('/login')
        }
        setLoading(false)
    },[userStatus, authentication, navigate])

  return (
    loading ? <Skeleton className="w-[100px] h-[20px] rounded-full"/> : <div>{children}</div>
  )
}

export default AuthLayout