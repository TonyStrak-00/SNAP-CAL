import React from 'react';
import { CameraIcon } from 'lucide-react';

const LandingScreen: React.FC = () => {
  const scrollToCapture = () => {
    const captureSection = document.getElementById('capture-section');
    if (captureSection) {
      captureSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 flex flex-col items-center text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-blue-500">Snap</span> • 
          <span className="text-emerald-500">Track</span> • 
          <span className="text-amber-500">Calories</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Instantly know what's on your plate with a simple photo. Get accurate calories and macros in seconds.
        </p>
        <button
          onClick={scrollToCapture}
          className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg shadow hover:bg-emerald-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <CameraIcon className="mr-2 h-5 w-5" />
          Get Started
        </button>
      </div>
      <img
        src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Healthy food on a plate"
        className="mt-12 rounded-lg shadow-lg max-w-full md:max-w-lg h-auto object-cover"
      />
    </section>
  );
};

export default LandingScreen;