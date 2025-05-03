import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, Image as ImageIcon, X } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const CaptureScreen: React.FC = () => {
  const { dispatch } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Cleanup function for camera stream
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
  
  // Handle camera stream
  const startCamera = async () => {
    try {
      setCameraError(null);
      console.log('Requesting camera access...');
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      console.log('Camera access granted');
      setStream(mediaStream);
      
      if (videoRef.current) {
        console.log('Setting up video element');
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          videoRef.current?.play().catch(err => {
            console.error('Error playing video:', err);
            setCameraError('Failed to play video stream');
          });
        };
        setShowCamera(true);
      } else {
        console.error('Video element not found');
        setCameraError('Video element not initialized');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError(error instanceof Error ? error.message : 'Failed to access camera');
      setShowCamera(false);
    }
  };
  
  // Stop camera stream
  const stopCamera = () => {
    console.log('Stopping camera stream');
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setCameraError(null);
  };
  
  // Capture photo from camera
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        dispatch({ type: 'SET_IMAGE', payload: imageData });
        stopCamera();
      }
    }
  };
  
  // Handle file upload
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Process the selected file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  // Process the file (convert to base64 and set in state)
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
  
  return (
    <section 
      id="capture-section" 
      className="py-12 md:py-16"
      onDragEnter={handleDrag}
    >
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Upload Your Food Photo
        </h2>
        
        {showCamera ? (
          <div className="relative rounded-lg overflow-hidden mb-6 bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto object-cover"
              style={{ minHeight: '300px', backgroundColor: 'black' }}
            />
            {cameraError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white p-4 text-center">
                {cameraError}
              </div>
            )}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button
                onClick={capturePhoto}
                className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-full shadow-lg hover:bg-emerald-600 transition-colors duration-200"
              >
                Take Photo
              </button>
              <button
                onClick={stopCamera}
                className="p-2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          <>
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
                onClick={startCamera}
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
          </>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </section>
  );
};

export default CaptureScreen;