
import React from 'react';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ logoUrl, title, tagline }) => {
  return (
    <header className="bg-black py-4 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-start">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logoUrl} alt="UK Creation Logo" className="h-16 w-16 md:h-20 md:w-20 mr-4 rounded-full border-2 border-yellow-400 shadow-md ring-1 ring-gray-400/50 ring-offset-2 ring-offset-black" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 leading-tight">{title}</h1>
            <p className="text-sm md:text-md text-gray-300 mt-1">{tagline}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
