
import React from 'react';

export interface PricingItem {
  item: string;
  description: string;
  value: string;
  offered: string;
  icon?: React.ReactNode; // Kept as React.ReactNode if used, but OCR showed strings. Assuming string for icon URL context.
}

export interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  pincode: string;
  businessCategory: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconUrl: string;
}

export interface IconProps {
  iconUrl: string;
  altText: string;
  className?: string;
  size?: number;
  wrapperClassName?: string;
}

export interface HeroBannerProps {
  images: string[];
  slideDirection: 'left' | 'right';
}

export interface CountdownTimerProps {
  targetDate: Date;
  segmentClassName?: string;
  numberClassName?: string;
  labelClassName?: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface HeaderProps {
  logoUrl: string;
  title: string;
  tagline: string;
}

export interface PricingTableProps {
  isVisible: boolean;
  onRevealPricesClick: () => void;
}

export interface BookingFormModalProps {
  onSubmitSuccess: (formData: FormData) => void;
  onClose: () => void;
}

export interface IconPanelItem {
  name: string;
  iconUrl: string;
}

export interface WhyThisMattersItem {
  title: string;
  description: string;
  iconUrl: string;
}

export interface AboutUsProps {
  logoUrl: string;
}

export interface GeminiInsightsState {
  insights: string[];
  isLoading: boolean;
  error: string | null;
}

export interface GeminiServiceResponse {
  data?: string[];
  error?: string;
}
