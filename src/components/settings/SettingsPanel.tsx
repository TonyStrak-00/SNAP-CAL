import React from 'react';
import SettingsModal from './SettingsModal';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  return <SettingsModal isOpen={isOpen} onClose={onClose} />;
};

export default SettingsPanel;