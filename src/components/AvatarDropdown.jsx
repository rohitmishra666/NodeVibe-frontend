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
import { useDispatch } from 'react-redux'

function AvatarDropdown(avatarUrl, username) {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        const response = axios.post(import.meta.env.VITE_USER_URL + '/logout')

        if(!response){
            throw new Error('Failed to logout')
        }
        dispatch(logout());
    }

    return (
        <Avatar>
            <DropdownMenu>
                <DropdownMenuTrigger><AvatarImage className="rounded-full h-16 w-16 overflow-hidden object-cover" src="https://hips.hearstapps.com/hmg-prod/images/index-john-643f0c7df1e1c.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*" />
                    <AvatarFallback>U</AvatarFallback></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Username</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link to="/profile">Profile</Link>
                        </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button onClick={logoutHandler}>Logout</button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Avatar>
    )
}

export default AvatarDropdown