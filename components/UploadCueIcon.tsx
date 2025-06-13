
import React from 'react';
import Icon from './Icon';
import { ICON_URLS } from '../constants';

const UploadCueIcon: React.FC = () => {
  return (
    <div
      className="fixed top-4 right-[6.5rem] z-30" // Positioned to be next to SimpleShareButton
      aria-hidden="true"
      title="Share options available"
    >
      <Icon
        iconUrl={ICON_URLS.uploadCue}
        altText="Share cue"
        size={18}
        wrapperClassName="bg-transparent ring-0"
      />
    </div>
  );
};

export default UploadCueIcon;
