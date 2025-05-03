import React from 'react';
import { type FoodData } from '../../contexts/AppContext';

interface MacronutrientCardProps {
  foodData: FoodData;
}

const MacronutrientCard: React.FC<MacronutrientCardProps> = ({ foodData }) => {
  const totalMacros = foodData.protein + foodData.carbs + foodData.fat;
  
  // Calculate percentages for the progress bars
  const proteinPercentage = (foodData.protein / totalMacros) * 100;
  const carbsPercentage = (foodData.carbs / totalMacros) * 100;
  const fatPercentage = (foodData.fat / totalMacros) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Macronutrients
        </h3>
        
        <div className="space-y-5">
          {/* Protein */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Protein</span>
              <span className="text-sm font-medium text-gray-900">{foodData.protein}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${proteinPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Carbs */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Carbs</span>
              <span className="text-sm font-medium text-gray-900">{foodData.carbs}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${carbsPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Fat */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Fat</span>
              <span className="text-sm font-medium text-gray-900">{foodData.fat}g</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-amber-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${fatPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
          <div className="bg-blue-50 p-2 rounded-lg">
            <p className="text-xs text-blue-800 font-medium">Protein</p>
            <p className="text-sm font-bold text-gray-800">{Math.round(proteinPercentage)}%</p>
          </div>
          <div className="bg-emerald-50 p-2 rounded-lg">
            <p className="text-xs text-emerald-800 font-medium">Carbs</p>
            <p className="text-sm font-bold text-gray-800">{Math.round(carbsPercentage)}%</p>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg">
            <p className="text-xs text-amber-800 font-medium">Fat</p>
            <p className="text-sm font-bold text-gray-800">{Math.round(fatPercentage)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacronutrientCard;