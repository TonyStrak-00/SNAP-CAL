import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Check } from 'lucide-react';
import { getFoodData } from '../services/nutritionService';

const AlternativesScreen: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { alternatives } = state;
  
  if (!alternatives) return null;
  
  const handleSelectAlternative = async (foodName: string) => {
    try {
      dispatch({ type: 'START_PROCESSING' });
      const nutritionData = await getFoodData(foodName);
      dispatch({
        type: 'SET_FOOD_DATA',
        payload: {
          name: foodName,
          confidence: 100, // We're selecting this manually, so confidence is 100%
          ...nutritionData
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
      }
    }
  };
  
  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Select Your Food
      </h2>
      
      <p className="text-center text-gray-600 mb-6">
        We found multiple possible matches. Please select the correct one:
      </p>
      
      <div className="space-y-3 mb-6">
        {alternatives.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSelectAlternative(item.name)}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div>
              <h3 className="font-medium text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">
                {Math.round(item.confidence)}% confidence
              </p>
            </div>
            <Check className="w-5 h-5 text-emerald-500" />
          </button>
        ))}
      </div>
      
      <button
        onClick={() => dispatch({ type: 'CLEAR_IMAGE' })}
        className="w-full py-2 text-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-200"
      >
        Try a different image
      </button>
    </div>
  );
};

export default AlternativesScreen;