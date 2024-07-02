import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiServices';
import { useAuth } from '../context/AuthContext';
import { ApiResponse, LoginResponse } from '../services/interfaces';

type SignInFormInputs = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInFormInputs>();

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const { login: loginAuthUser } = useAuth();

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      let response: any = await loginUser(data);
      const token = response.data?.access_token;
      console.log(response);
      if (response?.statusCode === 200 && token) {
        loginAuthUser(token);
        navigate('/welcome');
        reset()
      } else {
        setErrorMessage(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          setErrorMessage('Invalid Credentials');
        } else {
          setErrorMessage('Failed to login. Please try again later.');
        }
      } else if (error.request) {
        console.log('Request data:', error.request);
        setErrorMessage('No response received. Please try again later.');
      } else {
        console.log('Error message:', error.message);
        setErrorMessage('Error occurred during login. Please try again later.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src="/eg_logo_color.png" alt="Easygenerator Logo" className="h-16 mb-4" />
      {errorMessage && (
        <div className="w-full max-w-md bg-red-200 text-red-700 p-3 mb-4 border border-red-500 rounded-lg text-center">
          {errorMessage}
        </div>
      )}
      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              id="email"
              className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              id="password"
              className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};


export default SignIn;