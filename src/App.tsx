import React from 'react';
import { AppProvider } from './contexts/AppContext';
import MainLayout from './components/layouts/MainLayout';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <AppProvider>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </AppProvider>
  );
}

export default App;