import React, { createContext, useContext, useReducer } from 'react';
import { Loader2 } from 'lucide-react';

// Types
export type FoodData = {
  name: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type AppState = {
  currentImage: string | null;
  isProcessing: boolean;
  foodData: FoodData | null;
  error: string | null;
  alternatives: { name: string; confidence: number }[] | null;
  selectedAlternative: string | null;
};

type AppAction =
  | { type: 'SET_IMAGE'; payload: string }
  | { type: 'CLEAR_IMAGE' }
  | { type: 'START_PROCESSING' }
  | { type: 'SET_FOOD_DATA'; payload: FoodData }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_ALTERNATIVES'; payload: { name: string; confidence: number }[] }
  | { type: 'SELECT_ALTERNATIVE'; payload: string }
  | { type: 'RESET' };

// Initial state
const initialState: AppState = {
  currentImage: null,
  isProcessing: false,
  foodData: null,
  error: null,
  alternatives: null,
  selectedAlternative: null,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_IMAGE':
      return {
        ...state,
        currentImage: action.payload,
        error: null,
        foodData: null,
        alternatives: null,
        selectedAlternative: null,
      };
    case 'CLEAR_IMAGE':
      return {
        ...state,
        currentImage: null,
        foodData: null,
        error: null,
        alternatives: null,
        selectedAlternative: null,
      };
    case 'START_PROCESSING':
      return { ...state, isProcessing: true, error: null };
    case 'SET_FOOD_DATA':
      return { ...state, foodData: action.payload, isProcessing: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isProcessing: false };
    case 'SET_ALTERNATIVES':
      return { ...state, alternatives: action.payload, isProcessing: false };
    case 'SELECT_ALTERNATIVE':
      return { ...state, selectedAlternative: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};