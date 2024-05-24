import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { login as authLogin } from '@/store/authSlice'


function Login() {

  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const login = async (data) => {
    setError("null")
    try {

      const createdUser = await axios.post(import.meta.env.VITE_USER_URL + "/login", data,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )

      // we get the access token , refresh token and user data

      if (createdUser.data.data) {
        dispatch(authLogin(createdUser.data.data))
        navigate("/")
      }

    }
    catch (error) {
      setError(error?.response?.data?.message)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          {/* <label className="block text-gray-700 text-sm text-center font-bold mb-2" htmlFor="email">
            Email
          </label> */}
          <input
            {...register("email", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label> */}
          <input
            {...register("password", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        {error !== null && <p className="text-red-500 text-xs italic">{error}</p>}
        <div className="flex items-center justify-center">
          <Button
            onClick={handleSubmit(login)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </Button>
        </div>
        <div>
          <p>Don&apos;t have an account?&nbsp;
            <a
              className="text-blue-600 text-lg hover:underline font-semibold"
              href="/signup">
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login