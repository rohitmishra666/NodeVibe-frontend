import userUtils from '@/utils/user.utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { login as authLogin } from '@/store/authSlice';
import { handleHtmlError } from '@/utils/error.utils';
import { toast } from 'react-toastify';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data) => {
    setError(null);
    try {
      
      const createdUser = await userUtils.login(data);
      if (createdUser?.data?.statusCode === 200) {
        dispatch(authLogin(createdUser.data.data));
        navigate("/");
        toast.success('Logged in successfully');

      } else if (createdUser?.response?.status === 404) {
        setError(handleHtmlError(createdUser));
        toast.error(handleHtmlError(createdUser));

      } else {
        setError("Something went wrong. Please try again later.");
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      toast.error("Network error. Please try again later.");
    }
  };

  const handleLogin = (data) => {
    login(data);
  };

  return (
    <section className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit(handleLogin)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            id="email"
            type="email"
            className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Enter your email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : null}
          />
          {errors.email && <p id="email-error" className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            id="password"
            type="password"
            className={`shadow appearance-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Enter your password"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : null}
          />
          {errors.password && <p id="password-error" className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </Button>
        </div>
        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?&nbsp;
            <a
              className="text-blue-600 hover:underline"
              href="/signup"
            >
              Signup
            </a>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Login;
