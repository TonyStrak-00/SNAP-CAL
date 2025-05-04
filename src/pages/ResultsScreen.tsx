import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Camera, Upload } from 'lucide-react';
import FoodCard from '../components/cards/FoodCard';
import MacronutrientCard from '../components/cards/MacronutrientCard';
import CameraModal from '../components/camera/CameraModal';

const ResultsScreen: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { user } = useAuth();
  const { foodData } = state;
  const [showCameraModal, setShowCameraModal] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (foodData && user) {
      saveScanToHistory();
    }
  }, [foodData, user]);
  
  const saveScanToHistory = async () => {
    if (!foodData || !user) return;
    
    try {
      const { error } = await supabase
        .from('scan_history')
        .insert([
          {
            user_id: user.id,
            food_name: foodData.name,
            calories: foodData.calories,
            protein: foodData.protein,
            carbs: foodData.carbs,
            fat: foodData.fat,
            confidence: foodData.confidence
          }
        ]);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error saving scan to history:', error);
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        dispatch({ type: 'SET_IMAGE', payload: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (imageData: string) => {
    dispatch({ type: 'SET_IMAGE', payload: imageData });
  };
  
  if (!foodData) return null;
  
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Food Analysis Results
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <FoodCard foodData={foodData} />
        <MacronutrientCard foodData={foodData} />
      </div>
      
      <div className="mt-10 text-center space-y-4">
        <p className="text-gray-600">
          Want to track another food item?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowCameraModal(true)}
            className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors duration-200"
          >
            <Camera className="w-5 h-5 mr-2" />
            Take Photo
          </button>
          <button
            onClick={handleFileUpload}
            className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors duration-200"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Photo
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />

      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
};

export default ResultsScreen;