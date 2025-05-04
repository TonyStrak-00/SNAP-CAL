import React from 'react';
import { X, ArrowRight, Camera, Upload } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { analyzeImage } from '../services/visionService';
import CameraModal from '../components/camera/CameraModal';

const PreviewScreen: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [showCameraModal, setShowCameraModal] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleRemoveImage = () => {
    dispatch({ type: 'CLEAR_IMAGE' });
  };
  
  const handleAnalyze = async () => {
    if (!state.currentImage) return;
    
    dispatch({ type: 'START_PROCESSING' });
    
    try {
      const result = await analyzeImage(state.currentImage);
      dispatch({ type: 'SET_FOOD_DATA', payload: result });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
      }
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
  
  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Preview & Confirm
      </h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        {state.currentImage && (
          <div className="relative">
            <img 
              src={state.currentImage} 
              alt="Selected food" 
              className="w-full h-auto object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-opacity duration-200"
              aria-label="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setShowCameraModal(true)}
              className="flex items-center justify-center py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Camera className="w-5 h-5 mr-2" />
              Retake Photo
            </button>
            
            <button
              onClick={handleFileUpload}
              className="flex items-center justify-center py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Upload className="w-5 h-5 mr-2" />
              Reupload
            </button>
          </div>
          
          <button
            onClick={handleAnalyze}
            className="w-full flex items-center justify-center py-3 px-4 bg-emerald-500 text-white font-medium rounded-lg shadow hover:bg-emerald-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Analyze Food
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-center text-gray-500">
        Photos are processed securely; no copies are stored.
      </p>

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

export default PreviewScreen;