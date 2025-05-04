import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserProfile {
  name: string;
  height: number;
  weight: number;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    height: 170,
    weight: 70,
    date_of_birth: '',
    gender: 'prefer_not_to_say'
  });

  useEffect(() => {
    if (isOpen && user) {
      loadProfile();
    }
  }, [isOpen, user]);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select()
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
      } else {
        // If no profile exists, keep the default values
        console.log('No profile found, using default values');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          ...profile
        });

      if (error) throw error;
      toast.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
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

        <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                id="date_of_birth"
                type="date"
                value={profile.date_of_birth}
                onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as UserProfile['gender'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2 px-4 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;