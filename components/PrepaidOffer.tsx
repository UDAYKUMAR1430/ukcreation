
import React, { useState, useEffect, useCallback } from 'react';
import { GOOGLE_PAY_QR_CODE_URL, PREPAID_OFFER_FREEBIES_ITEMS, PREPAID_OFFER_FREEBIES_TOTAL_VALUE, ICON_URLS } from '../constants';
import Icon from './Icon';

interface PrepaidOfferProps {
  offerExpiryTimestamp: number | null;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const PrepaidOffer: React.FC<PrepaidOfferProps> = ({ offerExpiryTimestamp }) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isOfferActive, setIsOfferActive] = useState<boolean>(false);

  const calculateTimeLeft = useCallback((): TimeLeft | null => {
    if (!offerExpiryTimestamp) return null;

    const difference = offerExpiryTimestamp - Date.now();
    if (difference <= 0) {
      return null;
    }
    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [offerExpiryTimestamp]);

  useEffect(() => {
    if (!offerExpiryTimestamp) {
      setIsOfferActive(false);
      setTimeLeft(null);
      return; 
    }

    const initialTimeLeft = calculateTimeLeft();
    if (initialTimeLeft) {
      setTimeLeft(initialTimeLeft);
      setIsOfferActive(true);
    } else { 
      setIsOfferActive(false);
      setTimeLeft(null);
      return; 
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft);
        setIsOfferActive(true);
      } else {
        setTimeLeft(null);
        setIsOfferActive(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [offerExpiryTimestamp, calculateTimeLeft]);
  
  const countdownText = timeLeft 
    ? `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`
    : '00:00:00';

  return (
    <div className="mt-8 p-6 md:p-8 bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900 rounded-xl shadow-2xl border-2 border-yellow-300 transform hover:scale-[1.02] transition-transform duration-300">
      <div className="text-center">
        <Icon iconUrl={ICON_URLS.star} altText="Exclusive Offer Star" size={48} wrapperClassName="bg-gray-800 inline-block" className="mb-4" />
        <h3 className="text-3xl md:text-4xl font-bold mb-3">Exclusive Prepaid Offer!</h3>
        <p className="text-lg md:text-xl mb-2">
          Grab this one-time deal! Pay upfront for any plan within 
          {isOfferActive ? (
            <strong className="text-red-700 text-xl md:text-2xl mx-1">{countdownText}</strong>
          ) : (
            <strong className="text-gray-700 text-xl md:text-2xl mx-1">00:00:00</strong>
          )}
           of form submission and get:
        </p>
        <p className="text-2xl font-bold text-green-700 mb-6">
          FREE items worth {PREPAID_OFFER_FREEBIES_TOTAL_VALUE}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
        {PREPAID_OFFER_FREEBIES_ITEMS.map(item => (
          <div key={item.name} className="p-4 bg-yellow-100/30 rounded-lg shadow-md border border-yellow-600">
            <Icon iconUrl={item.iconUrl} altText={item.name} size={32} wrapperClassName="bg-gray-800 inline-block" className="mb-2" />
            <p className="font-semibold text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-700">(Value: {item.value})</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowQrModal(true)}
        disabled={!isOfferActive}
        className={`w-full font-bold py-4 px-6 rounded-lg text-xl shadow-lg transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-opacity-50 flex items-center justify-center space-x-2
          ${isOfferActive 
            ? 'bg-gray-800 hover:bg-gray-900 text-yellow-400 hover:shadow-xl hover:-translate-y-1 focus:ring-yellow-300' 
            : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
      >
        {isOfferActive ? (
          <>
            <Icon iconUrl={ICON_URLS.rocketLaunch} altText="" size={24} wrapperClassName="bg-transparent ring-0 !p-0" className="text-yellow-400" />
            <span>Secure Your FREE items - Pay Now!</span>
            <Icon iconUrl={ICON_URLS.rocketLaunch} altText="" size={24} wrapperClassName="bg-transparent ring-0 !p-0" className="text-yellow-400" />
          </>
        ) : (
          <>
            <Icon iconUrl={ICON_URLS.timer} altText="" size={24} wrapperClassName="bg-transparent ring-0 !p-0" className="text-gray-300"/>
            <span>Offer Expired</span>
            <Icon iconUrl={ICON_URLS.timer} altText="" size={24} wrapperClassName="bg-transparent ring-0 !p-0" className="text-gray-300"/>
          </>
        )}
      </button>

      {showQrModal && isOfferActive && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-[110] animate-fadeIn">
          <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md text-center border-2 border-yellow-400">
            <h4 className="text-2xl font-bold text-yellow-400 mb-4">Scan to Pay with Google Pay</h4>
            <img src={GOOGLE_PAY_QR_CODE_URL} alt="Google Pay QR Code" className="w-64 h-64 mx-auto mb-6 rounded-md border-4 border-yellow-400" />
            <p className="text-gray-300 mb-4 text-sm">Scan this QR code using your Google Pay app to complete the payment for your chosen plan and avail the offer.</p>
            <p className="text-yellow-300 text-xs mb-4">Offer valid for <strong className="text-red-600">{countdownText}</strong></p>
            <button
              onClick={() => setShowQrModal(false)}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-6 rounded-md transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrepaidOffer;
