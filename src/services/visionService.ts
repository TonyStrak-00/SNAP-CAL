import { getFoodData } from './nutritionService';
import type { FoodData } from '../contexts/AppContext';

// Google Cloud Vision API key
const API_KEY = 'AIzaSyB45LM6pzzDwrVa_LwfLy4_HHF2qvjVFcs';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

// Common food categories for better classification
const foodCategories = {
  fruits: ['apple', 'banana', 'orange', 'grape', 'strawberry', 'blueberry', 'mango', 'pineapple', 'watermelon', 'kiwi'],
  vegetables: ['carrot', 'broccoli', 'tomato', 'cucumber', 'lettuce', 'potato', 'onion', 'pepper', 'spinach'],
  proteins: ['chicken', 'beef', 'fish', 'egg', 'tofu', 'salmon', 'shrimp', 'pork', 'turkey'],
  grains: ['bread', 'rice', 'pasta', 'cereal', 'oatmeal', 'quinoa'],
  dairy: ['milk', 'cheese', 'yogurt', 'butter', 'cream'],
  desserts: ['cake', 'ice cream', 'cookie', 'chocolate', 'pie', 'donut']
};

function findSpecificFood(labels: any[]): { name: string; confidence: number } | null {
  // First, try to find exact matches in our food categories
  for (const label of labels) {
    const description = label.description.toLowerCase();
    
    for (const [category, foods] of Object.entries(foodCategories)) {
      const match = foods.find(food => 
        description.includes(food) || 
        description === food ||
        description.endsWith(` ${food}`) ||
        description.startsWith(`${food} `)
      );
      
      if (match) {
        return {
          name: match,
          confidence: label.score * 100
        };
      }
    }
  }
  
  // If no exact match, look for category matches and get alternatives
  const foodMatches = labels
    .filter(label => {
      const desc = label.description.toLowerCase();
      return Object.keys(foodCategories).some(category => 
        desc.includes(category) || 
        foodCategories[category as keyof typeof foodCategories].some(food => 
          desc.includes(food)
        )
      );
    })
    .map(label => ({
      name: label.description,
      confidence: label.score * 100
    }));
  
  return foodMatches.length > 0 ? foodMatches[0] : null;
}

export async function analyzeImage(imageData: string): Promise<FoodData> {
  try {
    // Extract base64 data
    const base64Image = imageData.split(',')[1];
    
    // Prepare request to Vision API
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 15
            },
            {
              type: 'WEB_DETECTION',
              maxResults: 15
            },
            {
              type: 'OBJECT_LOCALIZATION',
              maxResults: 15
            }
          ]
        }
      ]
    };
    
    // Call Vision API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }
    
    const data = await response.json();
    const apiResponse = data.responses[0];
    
    if (!apiResponse) {
      throw new Error('No response from vision API');
    }
    
    // Combine all detection results
    const allLabels = [
      ...(apiResponse.labelAnnotations || []),
      ...(apiResponse.localizedObjectAnnotations || []),
      ...((apiResponse.webDetection?.webEntities || []).map((entity: any) => ({
        description: entity.description,
        score: entity.score || 0.5
      })))
    ];
    
    // Find specific food match
    const foodMatch = findSpecificFood(allLabels);
    
    if (!foodMatch) {
      // If no specific match, check if we have multiple possibilities
      const possibleFoods = allLabels
        .filter(label => label.score > 0.5)
        .map(label => ({
          name: label.description,
          confidence: label.score * 100
        }))
        .slice(0, 3);
      
      if (possibleFoods.length > 0) {
        throw { type: 'ALTERNATIVES', alternatives: possibleFoods };
      }
      
      throw new Error('No food items detected in the image');
    }
    
    // Get nutrition data for the identified food
    const nutritionData = await getFoodData(foodMatch.name);
    
    return {
      name: foodMatch.name,
      confidence: foodMatch.confidence,
      ...nutritionData
    };
  } catch (error) {
    // If we have alternatives, pass them along
    if (error && typeof error === 'object' && 'type' in error && error.type === 'ALTERNATIVES') {
      throw error;
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('An error occurred during image analysis');
  }
}