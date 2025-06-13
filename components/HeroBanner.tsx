
import React, { useState, useEffect, useRef } from 'react';
import { HeroBannerProps } from '../types';

const HeroBanner: React.FC<HeroBannerProps> = ({ images, slideDirection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (sectionRef.current) {
        setImageWidth(sectionRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (!images || images.length === 0) return null;

  const animationName = slideDirection === 'right' ? 'scroll-continuous-right' : 'scroll-continuous-left';
  const animationDuration = `${images.length * 5}s`;

  return (
    <section ref={sectionRef} className="relative w-full h-80 md:h-[500px] overflow-hidden rounded-lg shadow-2xl">
      {imageWidth > 0 && (
        <div
          className={`flex h-full [animation-timing-function:linear] [animation-iteration-count:infinite]`}
          style={{
            width: `${images.length * 2 * imageWidth}px`,
            animationName: animationName,
            animationDuration: animationDuration,
          } as React.CSSProperties} // Using style for dynamic animation properties as Tailwind arbitrary values for animation shorthand can be tricky with dynamic parts.
        >
          {[...images, ...images].map((src, index) => (
            <div
              key={`${slideDirection}-image-${index}`}
              className="flex-shrink-0 h-full"
              style={{ width: `${imageWidth}px` }}
            >
              <img
                src={src}
                alt={`Showcase ${slideDirection} image ${index % images.length + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
