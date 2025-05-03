import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-4 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} CalorieSnap. All photos are processed securely; no copies are stored.</p>
      </div>
    </footer>
  );
};

export default Footer;