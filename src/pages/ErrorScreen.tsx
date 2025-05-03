import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const ErrorScreen: React.FC = () => {
  const { state, dispatch } = useAppContext();
  
  const handleTryAgain = () => {
    dispatch({ type: 'CLEAR_IMAGE' });
  };
  
  return (
    <div className="max-w-md mx-auto py-12 flex flex-col items-center">
      <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
      
      <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
        Hmm, We're Not Sure About That
      </h2>
      
      <p className="text-center text-gray-600 mb-6">
        {state.error || "We couldn't identify the food in your image. Try another angle or better lighting."}
      </p>
      
      <button
        onClick={handleTryAgain}
        className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg shadow hover:bg-emerald-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <RefreshCw className="mr-2 h-5 w-5" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorScreen;