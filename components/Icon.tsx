
import React from 'react';
import { IconProps } from '../types';

const Icon: React.FC<IconProps> = ({ iconUrl, altText, className = "", size = 24, wrapperClassName = 'bg-black' }) => {
  return (
    <span
      className={`inline-flex items-center justify-center p-1 rounded-full ${wrapperClassName} ring-1 ring-gray-400/70 ${className}`}
      style={{ width: size + 8, height: size + 8 }} // Minimal style for dynamic sizing wrapper. Could be refactored if fixed sizes are preferred.
      aria-hidden="true"
    >
      <img
        src={iconUrl}
        alt={altText}
        width={size}
        height={size}
        className="object-contain"
      />
    </span>
  );
};

export default Icon;
