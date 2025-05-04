import React from 'react';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import BottomNav from '../ui/BottomNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;