import { getFoodData } from './nutritionService';
import type { FoodData } from '../contexts/AppContext';

// Google Cloud Vision API key
const API_KEY = 'AIzaSyB45LM6pzzDwrVa_LwfLy4_HHF2qvjVFcs';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export async function analyzeImage(imageData: string): Promise<FoodData> {
  try {
    // Extract base64 data (remove the "data:image/jpeg;base64," part)
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
              maxResults: 10
            },
            {
              type: 'WEB_DETECTION',
              maxResults: 10
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
    
    // Check if annotations exist
    if (!data.responses[0]?.labelAnnotations || data.responses[0].labelAnnotations.length === 0) {
      throw new Error('No food items detected in the image');
    }
    
    // Filter for food-related labels
    const foodLabels = data.responses[0].labelAnnotations.filter((label: any) => {
      // Common food-related terms to match in description
      const foodTerms = [
        'food', 'dish', 'meal', 'cuisine', 'fruit', 'vegetable', 'meat', 'dessert', 
        'breakfast', 'lunch', 'dinner', 'snack', 'bread', 'rice', 'pasta', 'pizza',
        'burger', 'sandwich', 'salad', 'soup', 'stew', 'fish', 'seafood', 'chicken',
        'beef', 'pork', 'lamb', 'dairy', 'cheese', 'yogurt', 'ice cream', 'cake',
        'chocolate', 'coffee', 'tea', 'juice', 'smoothie', 'drink'
      ];
      
      return foodTerms.some(term => 
        label.description.toLowerCase().includes(term)
      );
    });
    
    // Also check web detection results for more context
    const webDetection = data.responses[0].webDetection;
    if (webDetection?.webEntities) {
      const webFoodLabels = webDetection.webEntities
        .filter((entity: any) => entity.score > 0.5)
        .map((entity: any) => ({
          description: entity.description,
          score: entity.score
        }));
      
      // Combine with existing labels if they're food-related
      webFoodLabels.forEach((webLabel: any) => {
        if (!foodLabels.some(label => label.description === webLabel.description)) {
          foodLabels.push(webLabel);
        }
      });
    }
    
    // If no food labels found after filtering
    if (foodLabels.length === 0) {
      throw new Error('No food items detected in the image');
    }
    
    // Sort by confidence score
    foodLabels.sort((a: any, b: any) => b.score - a.score);
    
    // Check confidence level of top label
    const topLabel = foodLabels[0];
    
    if (topLabel.score < 0.7) {
      // Get multiple alternatives if confidence is low
      const alternatives = foodLabels.slice(0, 3).map((label: any) => ({
        name: label.description,
        confidence: label.score * 100
      }));
      
      throw { type: 'ALTERNATIVES', alternatives };
    }
    
    // Get nutrition data for the identified food
    const foodName = topLabel.description;
    const nutritionData = await getFoodData(foodName);
    
    return {
      name: foodName,
      confidence: topLabel.score * 100,
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