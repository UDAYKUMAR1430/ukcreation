
import React from 'react';
import { AboutUsProps } from '../types';
import Icon from './Icon';
import { ICON_URLS } from '../constants';

const AboutUs: React.FC<AboutUsProps> = ({ logoUrl }) => {
  const experiencePoints = [
    "Photography, Video Shooting",
    "Editing, Reels Creation",
    "Social Media Marketing",
    "Ex-Team Leadership in Marketing"
  ];

  return (
    <section className="py-12 bg-gray-800 rounded-lg shadow-xl border border-gray-400/60">
      <div className="container mx-auto px-6 text-center">
        <img
          src={logoUrl}
          alt="UK Creation Brand Logo"
          className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-yellow-400 shadow-lg mx-auto mb-8 ring-1 ring-gray-400/50 ring-offset-2 ring-offset-black"
        />
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">ABOUT US</h2>
        <p className="text-xl md:text-2xl font-semibold text-gray-200 mb-6">
          6+ years of collective hands-on experience:
        </p>
        <ul className="text-lg text-gray-300 mb-10 space-y-4 max-w-md mx-auto">
          {experiencePoints.map((point, index) => (
            <li key={index} className="flex items-start text-left p-3 bg-gray-700/60 rounded-lg shadow-md hover:bg-gray-700/90 transition-colors">
              <Icon
                iconUrl={ICON_URLS.check}
                altText="Checkmark"
                size={20}
                wrapperClassName="bg-gray-800"
                className="mr-3 mt-0.5 flex-shrink-0"
              />
              <span className="text-base md:text-lg">{point}</span>
            </li>
          ))}
        </ul>
        <div className="text-lg text-gray-200 text-center max-w-2xl mx-auto bg-gray-700 p-6 rounded-lg shadow-md border border-gray-400/60">
          <p>
            When you partner with UK CREATION, our team dedicates time from day one to deeply understand your brand. This means in the future, you wont need to repeat yourself. We will already know your vibe, your vision, and how you want things done – making everything faster, smoother, and stress-free for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
