import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <img
          src="/eg_logo_color.png" // Replace with your Easygenerator logo path
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
          {/* <img
            src="/en_homepage_header.jpg"
            alt="Hero Image"
            className="rounded-lg shadow-md"
          /> */}
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
  );
};

export default Welcome;
