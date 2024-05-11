import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from '@/store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function AvatarDropdown() {

    const user = useSelector(state => state.auth.userData)
    const state = useSelector(state => state.auth.status)

    const navigate = useNavigate()

    const avatarUrl = user?.avatar
    const userName = user?.fullName

    // console.log(avatarUrl)
    const dispatch = useDispatch()

    //TODO - Add token to header

    const header = {
        "content-type": "application/json",
        // "Authorization": "Bearer"
    }

    const logoutHandler = async () => {

        if (state) {
            const response = await axios.post(import.meta.env.VITE_USER_URL + '/logout', {},
                {
                    withCredentials: true
                }
            )
    
            if (!response) {
                throw new Error('Failed to logout!')
            }
    
            dispatch(logout());
            
            navigate('/login')
    
            console.log('Logged out', response)
        }
    }

    return (
        <Avatar>
            <DropdownMenu>
                <DropdownMenuTrigger><AvatarImage className="rounded-full h-16 w-16 overflow-hidden object-cover" src={avatarUrl} />
                    <AvatarFallback>U</AvatarFallback></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                        <button onClick={logoutHandler}>Logout</button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Avatar>
    )
}

export default AvatarDropdown