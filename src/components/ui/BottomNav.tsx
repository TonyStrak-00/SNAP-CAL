import React, { useState } from 'react';
import { User, History, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProfileModal from '../profile/ProfileModal';
import ScanHistoryModal from '../history/ScanHistoryModal';
import SettingsModal from '../settings/SettingsModal';

const BottomNav: React.FC = () => {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState<'profile' | 'history' | 'settings' | null>(null);

  if (!user) return null;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setActiveModal(activeModal === 'profile' ? null : 'profile')}
              className={`flex flex-col items-center p-2 ${
                activeModal === 'profile' ? 'text-emerald-500' : 'text-gray-600'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </button>

            <button
              onClick={() => setActiveModal(activeModal === 'history' ? null : 'history')}
              className={`flex flex-col items-center p-2 ${
                activeModal === 'history' ? 'text-emerald-500' : 'text-gray-600'
              }`}
            >
              <History className="w-6 h-6" />
              <span className="text-xs mt-1">History</span>
            </button>

            <button
              onClick={() => setActiveModal(activeModal === 'settings' ? null : 'settings')}
              className={`flex flex-col items-center p-2 ${
                activeModal === 'settings' ? 'text-emerald-500' : 'text-gray-600'
              }`}
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      <ProfileModal
        isOpen={activeModal === 'profile'}
        onClose={() => setActiveModal(null)}
      />
      <ScanHistoryModal
        isOpen={activeModal === 'history'}
        onClose={() => setActiveModal(null)}
      />
      <SettingsModal
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
};

export default BottomNav;