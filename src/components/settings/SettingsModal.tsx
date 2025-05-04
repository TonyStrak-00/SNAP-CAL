import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
    units: 'metric'
  });

  const handleSave = () => {
    // In a real app, save to backend/localStorage
    toast.success('Settings saved successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        <div className="space-y-6">
          <div>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Notifications</span>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="form-checkbox h-5 w-5 text-emerald-500"
              />
            </label>
          </div>

          <div>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Dark Mode</span>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                className="form-checkbox h-5 w-5 text-emerald-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Units
            </label>
            <select
              value={settings.units}
              onChange={(e) => setSettings({ ...settings, units: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lb, in)</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full py-2 px-4 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;