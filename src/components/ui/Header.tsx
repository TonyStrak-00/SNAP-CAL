import React from 'react';
import { Leaf } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();
  
  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2" onClick={handleReset} role="button" tabIndex={0}>
          <Leaf className="h-6 w-6 text-emerald-500" />
          <h1 className="text-xl font-bold text-gray-800">CalorieSnap</h1>
        </div>
        
        {(state.foodData || state.currentImage) && (
          <button
            onClick={handleReset}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors duration-200"
          >
            New Photo
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;