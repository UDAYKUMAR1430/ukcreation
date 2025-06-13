import React from 'react';
import { SOCIAL_LINKS, ICON_URLS } from '../constants';
import Icon from './Icon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 py-12 mt-16">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center mb-8">
          <Icon iconUrl={ICON_URLS.web} altText="" size={32} wrapperClassName="bg-gray-800 !p-0" className="mr-3 text-yellow-400" />
          <h3 className="text-3xl lg:text-4xl font-bold text-yellow-400">CONNECT WITH US</h3>
        </div>
        <div className="flex justify-center space-x-5 sm:space-x-8 mb-10">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Connect on ${link.name}`}
              title={`Connect on ${link.name}`}
              className="text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-125 focus:scale-125 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 rounded-full"
            >
              <Icon iconUrl={link.iconUrl} altText={link.name} size={32} wrapperClassName="bg-gray-800 hover:bg-gray-700" />
            </a>
          ))}
        </div>
        <p className="text-xl lg:text-2xl text-yellow-300 max-w-xl mx-auto leading-relaxed">
          It's not just a website. It's your new digital partner, and it starts today.
        </p>
        <p className="mt-10 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} UK CREATION. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
