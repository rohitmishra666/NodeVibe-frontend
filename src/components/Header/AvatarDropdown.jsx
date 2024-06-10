import React from "react";
import { Link } from "react-router-dom";
import userUtils from "@/utils/user.utils";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AvatarDropdown() {
    const user = useSelector((state) => state.auth.userData);
    const state = useSelector((state) => state.auth.status);

    const heightWidth = {
        height: "50px",
        width: "50px",
    };

    const navigate = useNavigate();

    const avatarUrl = user?.avatar;
    const userName = user?.fullName;

    // console.log(avatarUrl)
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        if (state) {
            const response = await userUtils.logout();
            if (!response) {
                throw new Error("Failed to logout!");
            }
            dispatch(logout());
            navigate("/");
            toast.success("Logged out successfully");

        }
    };

    return (
        <Avatar>
            <DropdownMenu>
                {(state && (
                    <DropdownMenuTrigger>
                        <AvatarImage
                            className="rounded-full h-16 w-16 overflow-hidden object-cover"
                            src={avatarUrl}
                        />
                    </DropdownMenuTrigger>
                )) || (
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/login");
                            }}
                            className="mt-2 cursor-pointer"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/hrjifpbq.json"
                                trigger="hover"
                                colors="primary:#c7c116"
                                style={heightWidth}
                            ></lord-icon>
                        </div>
                    )}
                {state && (
                    <DropdownMenuContent
                        className="flex flex-col text-center">
                        <DropdownMenuLabel >
                            {userName}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className=" bg-black h-[2px]" />
                        <DropdownMenuItem className="flex flex-col w-full">
                            <Link to="/profile" className="w-full">
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col w-full" onClick={logoutHandler}>
                            <button onClick={logoutHandler}>Logout</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        </Avatar>
    );
}

export default AvatarDropdown;
