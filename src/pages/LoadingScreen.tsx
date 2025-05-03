import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const loadingPhrases = [
  "Counting your calories...",
  "Analyzing your food...",
  "Identifying ingredients...",
  "Calculating macros...",
  "Almost ready..."
];

const LoadingScreen: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % loadingPhrases.length);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center py-16 h-[60vh]">
      <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
      <p className="text-xl font-medium text-gray-700 animate-pulse">
        {loadingPhrases[phraseIndex]}
      </p>
    </div>
  );
};

export default LoadingScreen;