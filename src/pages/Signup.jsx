import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { login as authLogin } from '@/store/authSlice'

function Signup() {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signUp = async (data) => {
    
      const createdUser = await axios.post(import.meta.env.VITE_USER_URL + "/register",
      {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        username: data.username,
        avatar: data.avatar[0],
        coverImage: data.coverImage[0]
      },
      {
        headers: {
        "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })

      console.log(createdUser.data.data, "createdUser")

      if (createdUser.data.data) {
        dispatch(authLogin(createdUser.data.data))
        navigate("/")
      }
      else {
        setError(createdUser.data.message)
      }
    
  }
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            {...register("fullName", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
            Avatar
          </label>
          <input
            {...register("avatar")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="avatar"
            type="file"
            accept='image/*'
            placeholder=""
          />
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
            Cover Image
          </label>
          <input
            {...register("coverImage")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="coverImage"
            type="file"
            accept='image/*'
            placeholder="Enter URL of your cover image"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            {...register("username", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleSubmit(signUp)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup