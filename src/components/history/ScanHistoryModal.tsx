import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { FoodData } from '../../contexts/AppContext';

interface ScanHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScanRecord extends FoodData {
  id: string;
  created_at: string;
}

const ScanHistoryModal: React.FC<ScanHistoryModalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    if (isOpen && user) {
      loadHistory();
    }
  }, [isOpen, user]);
  
  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('scan_history')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setHistory(data || []);
    } catch (error) {
      console.error('Error loading scan history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Scan History</h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : history.length === 0 ? (
          <p className="text-center text-gray-600 py-8">
            No scan history yet. Start by scanning some food!
          </p>
        ) : (
          <div className="overflow-y-auto flex-1">
            <div className="grid gap-4">
              {history.map((scan) => {
                const { date, time } = formatDateTime(scan.created_at);
                return (
                  <div
                    key={scan.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {scan.food_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {time} • {date}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-emerald-50 p-2 rounded">
                        <p className="text-xs text-emerald-700">Calories</p>
                        <p className="font-semibold text-emerald-900">{scan.calories} kcal</p>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs text-blue-700">Protein</p>
                        <p className="font-semibold text-blue-900">{scan.protein}g</p>
                      </div>
                      <div className="bg-amber-50 p-2 rounded">
                        <p className="text-xs text-amber-700">Carbs</p>
                        <p className="font-semibold text-amber-900">{scan.carbs}g</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <p className="text-xs text-purple-700">Fat</p>
                        <p className="font-semibold text-purple-900">{scan.fat}g</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanHistoryModal;