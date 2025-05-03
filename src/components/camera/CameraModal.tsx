import React, { useRef, useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageData: string) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen]);
  
  const startCamera = async () => {
    try {
      setError(null);
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      
      if (!videoRef.current) {
        throw new Error('Video element not available');
      }
      
      videoRef.current.srcObject = mediaStream;
      
      await new Promise<void>((resolve, reject) => {
        if (!videoRef.current) {
          reject(new Error('Video element not available'));
          return;
        }
        
        videoRef.current.onloadedmetadata = () => resolve();
        
        setTimeout(() => {
          reject(new Error('Video stream timed out'));
        }, 10000);
      });
      
      if (!videoRef.current) {
        throw new Error('Video element not available');
      }
      
      await videoRef.current.play();
      
    } catch (error) {
      let errorMessage = 'Failed to access camera';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Camera access denied. Please allow camera access in your browser settings.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No camera found. Please make sure your device has a camera.';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Camera is in use by another application.';
        }
      }
      
      setError(errorMessage);
      stopCamera();
    }
  };
  
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };
  
  const handleCapture = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (stream?.getVideoTracks()[0].getSettings().facingMode === 'user') {
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
      }
      
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      onCapture(imageData);
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="relative flex-grow">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
        />
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white p-6 text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={handleCapture}
          className="p-4 bg-emerald-500 rounded-full shadow-lg hover:bg-emerald-600 transition-colors duration-200"
          disabled={!!error}
        >
          <Camera className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CameraModal;