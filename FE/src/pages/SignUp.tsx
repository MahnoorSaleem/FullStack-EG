import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/apiServices';
import { ApiResponse, UserData } from '../services/interfaces';

type SignUpFormInputs = {
  email: string;
  name: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignUpFormInputs>();
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState<any>();

  const navigate = useNavigate();

  const onSubmit = async (userData: SignUpFormInputs) => {
    try {
      const response: any = await signupUser(userData);
      if (response.statusCode === 200 && response.data) {
        setSignUpSuccess(true);
        setSignupErrorMessage("");
        reset();
        // navigate('/login');
      }  else {
        console.info('Signup failed:', response || 'Unknown error');
        setSignUpSuccess(false);
        setSignupErrorMessage(response.data.message)
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setSignUpSuccess(false);
      setSignupErrorMessage("Failed to sign up. Please try again later.")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src="/eg_logo_color.png" alt="Easygenerator Logo" className="h-16 mb-4" />
        {signUpSuccess && (
         <div className="w-full max-w-md bg-red-200 text-red-700 p-3 mb-4 border border-red-500 rounded-lg text-center">
         Sign up successful! You can now log in.
        </div>
        )}
        {!signUpSuccess && signupErrorMessage && (
          <div className="w-full max-w-md bg-red-200 text-red-700 p-3 mb-4 border border-red-500 rounded-lg text-center">
           {signupErrorMessage}
          </div>
        )}

      <div className="w-full max-w-md bg-white p-8 border border-gray-300 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              id="name"
              className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
                  message: 'Password must contain at least one letter, one number, and one special character'
                }
              })}
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
              Sign Up
            </button>
          </div>
        </form>
      
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;