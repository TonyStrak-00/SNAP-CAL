import type { FoodData } from '../contexts/AppContext';

const USDA_API_KEY = '8u6wu96u74Ha8VHg4wQaprBDReMx8CVjSEK8fH6A';
const USDA_API_URL = 'https://api.nal.usda.gov/fdc/v1';

// Default nutrition values if API fails
const defaultNutrition = { calories: 200, protein: 10, carbs: 25, fat: 8 };

async function searchFoodInUSDA(query: string): Promise<any> {
  try {
    // First, search for the food item
    const searchResponse = await fetch(
      `${USDA_API_URL}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(query)}&pageSize=1`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to search food in USDA database');
    }

    const searchData = await searchResponse.json();
    
    if (!searchData.foods || searchData.foods.length === 0) {
      throw new Error('No matching food found in USDA database');
    }

    return searchData.foods[0];
  } catch (error) {
    console.error('Error searching USDA database:', error);
    throw error;
  }
}

function extractNutrients(foodData: any): FoodData {
  try {
    // Extract nutrients from USDA response
    const nutrients = foodData.foodNutrients;
    
    // Initialize values
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    // Map USDA nutrient IDs to our needed values
    nutrients.forEach((nutrient: any) => {
      switch (nutrient.nutrientId) {
        case 1008: // Energy (kcal)
          calories = nutrient.value || 0;
          break;
        case 1003: // Protein
          protein = nutrient.value || 0;
          break;
        case 1005: // Carbohydrates
          carbs = nutrient.value || 0;
          break;
        case 1004: // Total fat
          fat = nutrient.value || 0;
          break;
      }
    });

    return {
      name: foodData.description,
      calories: Math.round(calories),
      protein: Number(protein.toFixed(1)),
      carbs: Number(carbs.toFixed(1)),
      fat: Number(fat.toFixed(1)),
      confidence: 100 // This will be set by the vision service
    };
  } catch (error) {
    console.error('Error extracting nutrients:', error);
    return {
      name: foodData.description || 'Unknown Food',
      ...defaultNutrition,
      confidence: 100
    };
  }
}

export async function getFoodData(foodName: string): Promise<FoodData> {
  try {
    const usdaFood = await searchFoodInUSDA(foodName);
    return extractNutrients(usdaFood);
  } catch (error) {
    console.error('Error getting food data:', error);
    return {
      name: foodName,
      ...defaultNutrition,
      confidence: 100
    };
  }
}