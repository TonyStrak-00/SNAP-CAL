// This is a mock nutrition database
// In a real application, this would be a call to a nutrition API or database
const foodDatabase: Record<string, { calories: number; protein: number; carbs: number; fat: number }> = {
  // Fruits
  'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  'banana': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  'orange': { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  'strawberry': { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
  'blueberry': { calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3 },
  'watermelon': { calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2 },
  'grape': { calories: 69, protein: 0.7, carbs: 18, fat: 0.2 },
  'pineapple': { calories: 50, protein: 0.5, carbs: 13, fat: 0.1 },
  'mango': { calories: 60, protein: 0.8, carbs: 15, fat: 0.4 },
  'avocado': { calories: 160, protein: 2, carbs: 8.5, fat: 15 },

  // Vegetables
  'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  'carrot': { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2 },
  'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  'potato': { calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  'cucumber': { calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 },
  'lettuce': { calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2 },
  'onion': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
  'bell pepper': { calories: 31, protein: 1, carbs: 6, fat: 0.3 },
  'cauliflower': { calories: 25, protein: 2, carbs: 5, fat: 0.1 },

  // Meats
  'chicken': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'beef': { calories: 250, protein: 26, carbs: 0, fat: 17 },
  'pork': { calories: 242, protein: 26, carbs: 0, fat: 16 },
  'salmon': { calories: 206, protein: 22, carbs: 0, fat: 13 },
  'tuna': { calories: 184, protein: 40, carbs: 0, fat: 1 },
  'turkey': { calories: 189, protein: 29, carbs: 0, fat: 7 },
  'lamb': { calories: 294, protein: 25, carbs: 0, fat: 21 },
  'shrimp': { calories: 99, protein: 24, carbs: 0, fat: 0.3 },
  'crab': { calories: 97, protein: 19, carbs: 0, fat: 1.5 },
  'lobster': { calories: 89, protein: 19, carbs: 0, fat: 0.5 },

  // Dairy
  'milk': { calories: 149, protein: 8, carbs: 12, fat: 8 },
  'cheese': { calories: 402, protein: 25, carbs: 2, fat: 33 },
  'yogurt': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  'butter': { calories: 717, protein: 0.9, carbs: 0.1, fat: 81 },
  'ice cream': { calories: 207, protein: 3.5, carbs: 24, fat: 11 },
  'egg': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },

  // Grains
  'bread': { calories: 265, protein: 9, carbs: 49, fat: 3.2 },
  'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  'pasta': { calories: 158, protein: 5.8, carbs: 31, fat: 0.9 },
  'cereal': { calories: 379, protein: 8, carbs: 83, fat: 0.8 },
  'oatmeal': { calories: 68, protein: 2.5, carbs: 12, fat: 1.4 },

  // Fast Food
  'pizza': { calories: 285, protein: 12, carbs: 36, fat: 10 },
  'hamburger': { calories: 354, protein: 20, carbs: 29, fat: 17 },
  'hot dog': { calories: 250, protein: 10, carbs: 18, fat: 15 },
  'french fries': { calories: 312, protein: 3.4, carbs: 41, fat: 15 },
  'taco': { calories: 210, protein: 9, carbs: 21, fat: 10 },
  'burrito': { calories: 326, protein: 16, carbs: 41, fat: 11 },
  'sandwich': { calories: 290, protein: 15, carbs: 36, fat: 9 },
  'fried chicken': { calories: 246, protein: 17, carbs: 8, fat: 15 },
  
  // Desserts
  'cake': { calories: 352, protein: 3.9, carbs: 38, fat: 20 },
  'cookie': { calories: 488, protein: 5, carbs: 64, fat: 24 },
  'chocolate': { calories: 545, protein: 4.9, carbs: 60, fat: 31 },
  'doughnut': { calories: 452, protein: 4.9, carbs: 51, fat: 25 },
  'pie': { calories: 291, protein: 3, carbs: 34, fat: 15 },
  'brownie': { calories: 466, protein: 4.8, carbs: 61, fat: 24 },
  'cupcake': { calories: 305, protein: 3, carbs: 41, fat: 14 },

  // Beverages
  'coffee': { calories: 2, protein: 0.3, carbs: 0, fat: 0 },
  'tea': { calories: 2, protein: 0, carbs: 0.5, fat: 0 },
  'soda': { calories: 138, protein: 0, carbs: 38, fat: 0 },
  'orange juice': { calories: 112, protein: 1.7, carbs: 26, fat: 0.5 },
  'beer': { calories: 154, protein: 1.6, carbs: 13, fat: 0 },
  'wine': { calories: 123, protein: 0.1, carbs: 3.8, fat: 0 },
  'smoothie': { calories: 130, protein: 2.5, carbs: 30, fat: 0.5 },
  
  // Common dishes
  'salad': { calories: 100, protein: 3, carbs: 10, fat: 5 },
  'soup': { calories: 75, protein: 2.5, carbs: 10, fat: 2.5 },
  'stir fry': { calories: 220, protein: 15, carbs: 20, fat: 8 },
  'curry': { calories: 240, protein: 10, carbs: 20, fat: 13 },
  'sushi': { calories: 140, protein: 5.8, carbs: 28, fat: 0.3 },
  'risotto': { calories: 174, protein: 5, carbs: 30, fat: 3.8 },
  'lasagna': { calories: 284, protein: 17, carbs: 27, fat: 12 },
  'pasta salad': { calories: 160, protein: 4, carbs: 30, fat: 3 },
  'potato salad': { calories: 143, protein: 2.5, carbs: 16, fat: 8 },
};

// Generic defaults if food is not found
const defaultNutrition = { calories: 200, protein: 10, carbs: 25, fat: 8 };

// Function to find the closest match in our database
function findClosestMatch(label: string): string {
  // Convert input to lowercase
  const input = label.toLowerCase();
  
  // First, try direct match
  if (foodDatabase[input]) {
    return input;
  }
  
  // Try to find partial matches
  for (const foodName of Object.keys(foodDatabase)) {
    if (input.includes(foodName) || foodName.includes(input)) {
      return foodName;
    }
  }
  
  // If no match is found, use a generic category if possible
  const categories = ['fruit', 'vegetable', 'meat', 'dairy', 'grain', 'dessert', 'dish', 'food'];
  for (const category of categories) {
    if (input.includes(category)) {
      // Find a default for that category
      const categoryItems = Object.keys(foodDatabase).filter(name => name.includes(category));
      if (categoryItems.length > 0) {
        return categoryItems[0];
      }
    }
  }
  
  // Default to a random item if no matches
  const databaseKeys = Object.keys(foodDatabase);
  return databaseKeys[Math.floor(Math.random() * databaseKeys.length)];
}

export async function getFoodData(foodName: string) {
  // Find closest match in our database
  const matchedFood = findClosestMatch(foodName);
  
  // Return nutrition data for that food
  return foodDatabase[matchedFood] || defaultNutrition;
}