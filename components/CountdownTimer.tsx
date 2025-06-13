
import React, { useState, useEffect, useCallback } from 'react';
import { CountdownTimerProps, TimeLeft } from '../types';

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  segmentClassName,
  numberClassName,
  labelClassName
}) => {
  const calculateTimeLeft = useCallback((): TimeLeft | null => {
    if (!targetDate) return null;
    const difference = +targetDate - +new Date();
    if (difference <= 0) {
      return null;
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }
    // Set initial time
    setTimeLeft(calculateTimeLeft());

    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, [calculateTimeLeft, targetDate]);

  if (!timeLeft) {
    return <span className="text-red-700 font-semibold text-xl">Offer Expired!</span>;
  }

  const defaultSegmentClass = "flex flex-col items-center p-2 bg-gray-800/20 rounded-md shadow-md";
  const defaultNumberClass = "text-2xl md:text-4xl font-bold";
  const defaultLabelClass = "text-xs uppercase text-gray-800"; // Assuming this color is for when segmentClassName makes background light

  return (
    <div className={`flex space-x-2 md:space-x-4 items-center justify-center ${!segmentClassName ? 'text-gray-100' : ''}`}>
      {(Object.keys(timeLeft) as Array<keyof TimeLeft>).map((interval) => (
        <div key={interval} className={segmentClassName || defaultSegmentClass}>
          <span className={numberClassName || defaultNumberClass}>{String(timeLeft[interval]).padStart(2, '0')}</span>
          <span className={labelClassName || defaultLabelClass}>{interval}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
