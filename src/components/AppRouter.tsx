import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import LandingScreen from '../pages/LandingScreen';
import CaptureScreen from '../pages/CaptureScreen';
import PreviewScreen from '../pages/PreviewScreen';
import LoadingScreen from '../pages/LoadingScreen';
import ResultsScreen from '../pages/ResultsScreen';
import ErrorScreen from '../pages/ErrorScreen';
import AlternativesScreen from '../pages/AlternativesScreen';

const AppRouter: React.FC = () => {
  const { state } = useAppContext();
  const { currentImage, isProcessing, foodData, error, alternatives } = state;

  // Determine which screen to show based on app state
  if (error) {
    return <ErrorScreen />;
  }

  if (alternatives && alternatives.length > 0) {
    return <AlternativesScreen />;
  }
  
  if (foodData) {
    return <ResultsScreen />;
  }
  
  if (isProcessing) {
    return <LoadingScreen />;
  }
  
  if (currentImage) {
    return <PreviewScreen />;
  }
  
  return (
    <>
      <LandingScreen />
      <CaptureScreen />
    </>
  );
};

export default AppRouter;