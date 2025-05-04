import React, { useState } from 'react';
import { Leaf, LogOut } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
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
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors duration-200"
            >
              Sign In
            </button>
          )}
          
          {(state.foodData || state.currentImage) && (
            <button
              onClick={handleReset}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors duration-200"
            >
              New Photo
            </button>
          )}
        </div>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;