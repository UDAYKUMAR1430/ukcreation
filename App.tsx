
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ValuePromiseBar from './components/ValuePromiseBar';
import WhoNeedsThis from './components/WhoNeedsThis';
import WhyThisMatters from './components/WhyThisMatters';
import LimitedTimeDeal from './components/LimitedTimeDeal';
import AboutUs from './components/AboutUs';
import PricingTable from './components/PricingTable';
import IconPanel from './components/IconPanel';
import Footer from './components/Footer';
import BookingFormModal from './components/BookingFormModal';
import StickyShareButton from './components/StickyShareButton';
import PrepaidOffer from './components/PrepaidOffer';

import { BRAND_LOGO_URL, HERO_IMAGES_TOP, HERO_IMAGES_MID } from './constants';
import { FormData } from './types';

const OFFER_EXPIRY_LOCAL_STORAGE_KEY = 'ukCreationPrepaidOffer_v6'; // Versioning key
const OFFER_DURATION_HOURS = 24;

const App: React.FC = () => {
  const [isPricingVisible, setIsPricingVisible] = useState(false);
  const [showBookingFormModal, setShowBookingFormModal] = useState(false);
  const [offerExpiryTimestamp, setOfferExpiryTimestamp] = useState<number | null>(null);

  useEffect(() => {
    // Load offer expiry from local storage on initial mount
    const storedExpiry = localStorage.getItem(OFFER_EXPIRY_LOCAL_STORAGE_KEY);
    if (storedExpiry) {
      const expiryTimestamp = parseInt(storedExpiry, 10);
      if (!isNaN(expiryTimestamp) && expiryTimestamp > Date.now()) {
        setOfferExpiryTimestamp(expiryTimestamp);
      } else {
        // Clear expired or invalid timestamp
        localStorage.removeItem(OFFER_EXPIRY_LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  const handleRevealPricesClick = useCallback(() => {
    if (!isPricingVisible) {
      setShowBookingFormModal(true);
    }
  }, [isPricingVisible]);

  const handleFormSubmitSuccess = useCallback((formData: FormData) => {
    setIsPricingVisible(true);
    setShowBookingFormModal(false);
    console.log("Form data received in App:", formData);

    // Set offer expiry timestamp
    const now = new Date();
    const expiryTime = now.getTime() + OFFER_DURATION_HOURS * 60 * 60 * 1000;
    localStorage.setItem(OFFER_EXPIRY_LOCAL_STORAGE_KEY, expiryTime.toString());
    setOfferExpiryTimestamp(expiryTime);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowBookingFormModal(false);
  }, []);

  const isOfferActive = offerExpiryTimestamp !== null && offerExpiryTimestamp > Date.now();

  return (
    <div className="min-h-screen font-sans text-gray-100 app-background bg-cover bg-center bg-no-repeat bg-fixed">
      <Header
        logoUrl={BRAND_LOGO_URL}
        title="UK CREATION"
        tagline="The Website You've Been Searching For. Finally, It's Here."
      />
      <main className="container mx-auto px-4 py-10 space-y-16">
        <section className="text-center mt-4 mb-0">
          <p className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-tight leading-snug max-w-3xl mx-auto">
            You don't just need a website, you need a digital setup that looks sharp, earns trust, and brings real leads.
          </p>
        </section>
        <HeroBanner images={HERO_IMAGES_TOP} slideDirection="right" />
        <ValuePromiseBar />
        <WhoNeedsThis />
        <WhyThisMatters />
        <LimitedTimeDeal isPricingVisible={isPricingVisible} />
        <HeroBanner images={HERO_IMAGES_MID} slideDirection="left" />
        <AboutUs logoUrl={BRAND_LOGO_URL} />
        <PricingTable isVisible={isPricingVisible} onRevealPricesClick={handleRevealPricesClick} />
         <section id="booking-form-section" className="py-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">GET STARTED & UNLOCK OFFER</h2>
          {!isPricingVisible ? (
            <p className="text-gray-200 md:text-lg max-w-xl mx-auto">
              Click the "Prices Are Locked" button in the Package & Pricing Table section above, or the "Limited Time Offer" bonus section, fill out a quick form, and we will unlock your exclusive pricing and contact you!
            </p>
          ) : (
            <div className="animate-fadeIn">
              <p className="text-green-400 font-semibold text-lg mb-6">Thank you! Your pricing is now unlocked above. We will contact you shortly.</p>
              {isOfferActive ? (
                <PrepaidOffer offerExpiryTimestamp={offerExpiryTimestamp} />
              ) : (
                <div className="mt-8 p-6 md:p-8 bg-gray-700 text-gray-400 rounded-xl shadow-lg border border-gray-600">
                  <h3 className="text-2xl font-semibold mb-2">⏳ Offer Expired ⏳</h3>
                  <p>Our special 24-hour prepaid offer has expired. Keep an eye out for future deals!</p>
                </div>
              )}
            </div>
          )}
        </section>
        <IconPanel />
      </main>
      <Footer />

      {showBookingFormModal && (
        <BookingFormModal
          onSubmitSuccess={handleFormSubmitSuccess}
          onClose={handleCloseModal}
        />
      )}
      <StickyShareButton />
    </div>
  );
};

export default App;
