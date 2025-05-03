import React, { useRef, useState } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import CameraModal from '../components/camera/CameraModal';

const CaptureScreen: React.FC = () => {
  const { dispatch } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  const processFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file (JPG, PNG)');
      return;
    }
    
    if (file.size > 8 * 1024 * 1024) {
      alert('File is too large. Maximum size is 8MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      dispatch({ type: 'SET_IMAGE', payload: base64 });
    };
    reader.readAsDataURL(file);
  };
  
  const handleCameraCapture = (imageData: string) => {
    dispatch({ type: 'SET_IMAGE', payload: imageData });
  };
  
  return (
    <section id="capture-section" className="py-12 md:py-16" onDragEnter={handleDrag}>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Upload Your Food Photo
        </h2>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-8 mb-6 flex flex-col items-center justify-center transition-colors duration-200 ${
            dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center mb-2">
            Drag & drop your image here
          </p>
          <p className="text-gray-500 text-sm text-center">
            Supports JPG, JPEG, PNG (max 8MB)
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowCameraModal(true)}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 aspect-square"
          >
            <Camera className="w-10 h-10 text-emerald-500 mb-3" />
            <span className="font-medium text-gray-700">Take a Photo</span>
          </button>
          
          <button
            onClick={handleFileUpload}
            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 aspect-square"
          >
            <Upload className="w-10 h-10 text-emerald-500 mb-3" />
            <span className="font-medium text-gray-700">Upload from Device</span>
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      
      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCameraCapture}
      />
    </section>
  );
};

export default CaptureScreen;