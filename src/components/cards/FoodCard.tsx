import React from 'react';
import { type FoodData } from '../../contexts/AppContext';

interface FoodCardProps {
  foodData: FoodData;
}

const FoodCard: React.FC<FoodCardProps> = ({ foodData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-1">
          {foodData.name}
        </h3>
        <p className="text-xs text-gray-500">
          {Math.round(foodData.confidence)}% confidence
        </p>
        
        <div className="mt-4 bg-emerald-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Calories</span>
            <span className="text-xl font-bold text-gray-800">{foodData.calories} kcal</span>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Based on standard serving size. Values may vary depending on preparation method and ingredients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;