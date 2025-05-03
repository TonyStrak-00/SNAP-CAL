import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import FoodCard from '../components/cards/FoodCard';
import MacronutrientCard from '../components/cards/MacronutrientCard';

const ResultsScreen: React.FC = () => {
  const { state } = useAppContext();
  const { foodData } = state;
  
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
      
      <div className="mt-10 text-center">
        <p className="text-gray-600">
          Want to track another food item?
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-2 inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 font-medium rounded-lg hover:bg-emerald-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Back to Top
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;