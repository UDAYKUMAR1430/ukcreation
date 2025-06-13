
import React, { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import Icon from './Icon';
import { ICON_URLS } from '../constants';

const LIMITED_TIME_DEAL_EXPIRY_KEY = 'ukCreationLimitedTimeDealExpiry_v1'; // Unique key for this specific offer

interface LimitedTimeDealProps {
  isPricingVisible: boolean;
}

const LimitedTimeDeal: React.FC<LimitedTimeDealProps> = ({ isPricingVisible }) => {
  const [offerEndDate, setOfferEndDate] = useState<Date | null>(null);

  useEffect(() => {
    let expiryDateToSet: Date | null = null;
    const storedExpiry = localStorage.getItem(LIMITED_TIME_DEAL_EXPIRY_KEY);

    if (storedExpiry) {
      const expiryTimestamp = parseInt(storedExpiry, 10);
      if (!isNaN(expiryTimestamp) && expiryTimestamp > Date.now()) {
        expiryDateToSet = new Date(expiryTimestamp);
      } else {
        // Clear expired or invalid timestamp
        localStorage.removeItem(LIMITED_TIME_DEAL_EXPIRY_KEY);
      }
    }

    if (!expiryDateToSet) {
      // Set new expiry if not found or invalid
      const newExpiry = new Date();
      newExpiry.setDate(newExpiry.getDate() + 7); // 7 days from now
      localStorage.setItem(LIMITED_TIME_DEAL_EXPIRY_KEY, newExpiry.getTime().toString());
      expiryDateToSet = newExpiry;
    }
    setOfferEndDate(expiryDateToSet);
  }, []);

  const handleDealClick = () => {
    if (!isPricingVisible) {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-12 bg-gray-800 text-yellow-400 rounded-lg shadow-xl border border-gray-400/60">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
          <Icon iconUrl={ICON_URLS.partyPopper} altText="" size={36} wrapperClassName="bg-transparent ring-0 !p-0" className="mr-2 text-yellow-400"/>
            LIMITED TIME OFFER
          <Icon iconUrl={ICON_URLS.partyPopper} altText="" size={36} wrapperClassName="bg-transparent ring-0 !p-0" className="ml-2 text-yellow-400"/>
        </h2>
        <div className="mb-8">
          {offerEndDate ? (
            <CountdownTimer
              targetDate={offerEndDate}
              segmentClassName="flex flex-col items-center p-2 bg-yellow-500/20 rounded-md shadow-md text-yellow-400 border border-gray-300/70"
              numberClassName="text-2xl md:text-4xl font-bold"
              labelClassName="text-xs uppercase text-yellow-300/80"
            />
          ) : (
            <div className="text-xl text-gray-400">Loading offer details...</div>
          )}
        </div>
        <div
          className={`bg-yellow-400 text-gray-900 p-6 rounded-lg shadow-inner max-w-2xl mx-auto border border-gray-700/50 
            ${!isPricingVisible ? 'cursor-pointer hover:bg-yellow-500 transition-colors duration-200 ease-in-out transform hover:scale-105' : 'opacity-90'}`}
          onClick={handleDealClick}
          onKeyPress={!isPricingVisible ? (e) => e.key === 'Enter' && handleDealClick() : undefined}
          tabIndex={!isPricingVisible ? 0 : -1}
          role={!isPricingVisible ? "button" : undefined}
          aria-label={!isPricingVisible ? "Scroll to pricing section to unlock this bonus and reveal prices" : "Bonus offer details"}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left">
            <Icon
              iconUrl={ICON_URLS.gift}
              altText="Gift Icon"
              size={36}
              wrapperClassName="bg-gray-800"
              className="mr-0 sm:mr-4 mb-3 sm:mb-0 flex-shrink-0"
            />
            <div>
              <p className="text-xl md:text-2xl font-semibold leading-tight">
                Bonus Page + QR Code + Responsive Layout Included
              </p>
              <p className="text-md md:text-lg text-gray-700/80 mt-1">
                {!isPricingVisible ? "Click to explore pricing & unlock this bonus!" : "This bonus was part of your unlocked package!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeDeal;
