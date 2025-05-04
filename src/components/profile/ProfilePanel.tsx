import React from 'react';
import ProfileModal from './ProfileModal';

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ isOpen, onClose }) => {
  return <ProfileModal isOpen={isOpen} onClose={onClose} />;
};

export default ProfilePanel;