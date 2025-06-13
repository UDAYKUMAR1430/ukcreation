
import React, { useState } from 'react';
import Icon from './Icon';
import { ICON_URLS } from '../constants';

const SimpleShareButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy link: ', err);
        alert('Failed to copy link. Please try again.');
      });
    } else {
      alert('Share features not fully available. Please copy the link manually.');
    }
  };
  
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: 'Check out UK CREATION for premium web presence!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // If user cancels share, or error occurs, fallback to copy
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <button
      onClick={handleShare}
      className="fixed top-4 right-20 bg-black text-yellow-400 p-2.5 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95 z-40 ring-1 ring-gray-400/70"
      aria-label="Share this page (simple)"
      title={copied ? "Link Copied!" : "Share Page"}
    >
      <Icon
        iconUrl={ICON_URLS.simpleShare}
        altText="Share"
        size={20}
        wrapperClassName="bg-transparent ring-0"
      />
    </button>
  );
};

export default SimpleShareButton;
