
import React, { useState } from 'react';
import Icon from './Icon';
import { ICON_URLS } from '../constants';

const StickyShareButton: React.FC = () => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'Check out UK CREATION for premium web presence!',
          url: window.location.href,
        });
        setShowShareOptions(false);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          // Fallback or toggle if share was cancelled or failed for other reasons
           setShowShareOptions(!showShareOptions); // Toggle to show manual options
        }
      }
    } else {
      setShowShareOptions(!showShareOptions); // Show manual options if Web Share API not supported
    }
  };
  
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = "Check out UK CREATION for premium web presence!";

  const manualShareOptions = [
    {
      name: "Copy Link",
      action: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(pageUrl)
            .then(() => alert("Link copied to clipboard!"))
            .catch(err => console.error("Failed to copy: ", err));
        } else {
          alert("Clipboard API not available. Please copy manually.");
        }
      },
      icon: ICON_URLS.linkVariant
    },
    { name: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + pageUrl)}`, icon: ICON_URLS.whatsapp },
    { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, icon: ICON_URLS.facebook },
    { name: "Twitter", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`, icon: ICON_URLS.twitter },
  ];

  return (
    <>
      <button
        onClick={handleShareClick}
        className="fixed top-4 right-4 bg-black text-yellow-400 p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95 z-[60]"
        aria-label="Share this page"
        title="Share this page"
      >
        <img src={ICON_URLS.share} alt="Share" className="w-6 h-6" />
      </button>

      {showShareOptions && (
        <div className="fixed top-20 right-4 bg-gray-800 p-4 rounded-lg shadow-xl z-[70] border border-yellow-400 w-48 animate-fadeIn ring-1 ring-gray-400/60 ring-offset-1 ring-offset-gray-800">
          <p className="text-sm text-yellow-400 mb-2 font-semibold">Share via:</p>
          <div className="space-y-1">
            {manualShareOptions.map(option => (
              option.url ? (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-200 hover:text-yellow-400 transition-colors p-1 hover:bg-gray-700 rounded -mx-1"
                  onClick={() => setShowShareOptions(false)}
                >
                  <Icon iconUrl={option.icon} altText={option.name} size={18} wrapperClassName="bg-gray-900"/>
                  <span>{option.name}</span>
                </a>
              ) : (
                <button
                  key={option.name}
                  onClick={() => { if (option.action) option.action(); setShowShareOptions(false); }}
                  className="flex items-center space-x-2 text-gray-200 hover:text-yellow-400 transition-colors w-full text-left p-1 hover:bg-gray-700 rounded -mx-1"
                >
                  <Icon iconUrl={option.icon} altText={option.name} size={18} wrapperClassName="bg-gray-900"/>
                  <span>{option.name}</span>
                </button>
              )
            ))}
          </div>
          <button
            onClick={() => setShowShareOptions(false)}
            className="mt-3 text-xs text-gray-400 hover:text-white w-full text-right"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default StickyShareButton;
