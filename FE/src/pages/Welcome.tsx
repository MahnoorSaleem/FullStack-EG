import React, { useEffect, useState } from 'react';
import { viewProfile } from '../services/apiServices';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await viewProfile(token);
          setProfile(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login')
      }
    };

    fetchProfile();
  }, []);
  return (
    <div>
      {profile ? (
        <>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div>
            <h1>Welcome, {profile.name}</h1>
            <p>Email: {profile.email}</p>
          </div>
            <div className="max-w-4xl w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
              <img
                src="/eg_logo_color.png"
                alt="Easygenerator Logo"
                className="h-16 mb-4 mx-auto"
              />
              <h1 className="text-3xl font-bold text-center mb-4">
                Empower your team with Easygenerator
              </h1>
              <p className="text-lg text-gray-700 mb-6 text-center">
                Easygenerator empowers your team to create effective e-learning courses with ease.
              </p>
              <div className="flex justify-center mb-8">
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-4">
                  Key Features:
                </p>
                <ul className="list-disc list-inside">
                  <li>Create engaging e-learning content</li>
                  <li>Collaborate with your team seamlessly</li>
                  <li>Track learner progress effectively</li>
                </ul>
              </div>
              <div className="flex justify-center mt-8">
                <a
                  href="#"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg focus:outline-none focus:shadow-outline"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading profile...</p>
    )}
  </div>

  );
};

export default Welcome;