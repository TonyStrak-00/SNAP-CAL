import React from 'react';
import ScanHistoryModal from './ScanHistoryModal';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose }) => {
  return <ScanHistoryModal isOpen={isOpen} onClose={onClose} />;
};

export default HistoryPanel;