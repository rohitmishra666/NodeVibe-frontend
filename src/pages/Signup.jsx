import React from 'react'
import userUtils from '@/utils/user.utils'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '@/store/authSlice'
import { handleHtmlError } from '@/utils/error.utils'
import { toast, ToastContainer } from 'react-toastify'

function Signup() {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signUp = async (data) => {
    setError(null)
    const createdUser = await userUtils.register(data)

    if (createdUser?.data?.statusCode === 200) {
      dispatch(authLogin(createdUser.data.data))
      navigate("/")
    } else {
      setError(handleHtmlError(createdUser))
    }
  }

  const handleSignUp = (data) => {
    toast.promise(signUp(data), {
      loading: "Signing up...",
      success: "Signed up successfully",
      error: "Failed to sign up",
    })
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit(handleSignUp)}>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
              Avatar
            </label>
            <input
              {...register("avatar", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="avatar"
              type="file"
              accept="image/*"
              placeholder=""
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
              Cover Image
            </label>
            <input
              {...register("coverImage", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="coverImage"
              type="file"
              accept="image/*"
              placeholder="Enter URL of your cover image"
            />
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <p>
              Already have an account?&nbsp;
              <a
                className="text-blue-600 text-lg hover:underline font-semibold"
                href="/login">
                Login
              </a>
            </p>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <p className="bg-transparent text-gray-600 text-center">
              By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup
