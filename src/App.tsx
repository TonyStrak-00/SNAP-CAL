import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layouts/MainLayout';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainLayout>
          <AppRouter />
        </MainLayout>
        <Toaster position="bottom-center" />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;