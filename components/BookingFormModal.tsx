
import React, { useState } from 'react';
import { BookingFormModalProps, FormData } from '../types';
import { GOOGLE_SHEET_URL, WHO_NEEDS_THIS_POINTS } from '../constants';

const BookingFormModal: React.FC<BookingFormModalProps> = ({ onSubmitSuccess, onClose }) => {
  const [formDataState, setFormDataState] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    pincode: "",
    businessCategory: "", // Initial value for select
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fieldDisplayNames: Record<keyof FormData, string> = {
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone Number',
    email: 'Email ID',
    pincode: 'Pincode',
    businessCategory: 'Business Type/Category'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormDataState({ ...formDataState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    for (const key in formDataState) {
      if (key === 'email') continue; // Email is optional
      const typedKey = key as keyof Exclude<FormData, 'email'>; // Ensure key is not 'email' here
      if (!formDataState[typedKey]) {
        const fieldName = fieldDisplayNames[typedKey] || typedKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        setError(`Please fill in ${fieldName.toLowerCase()}.`);
        setIsSubmitting(false);
        return;
      }
    }
    
    // Specific validation for businessCategory if it's a select
    if (!formDataState.businessCategory) {
        setError(`Please select your ${fieldDisplayNames.businessCategory.toLowerCase()}.`);
        setIsSubmitting(false);
        return;
    }


    if (!/^\d{10}$/.test(formDataState.phone)) {
      setError('Please enter a valid 10-digit phone number.');
      setIsSubmitting(false);
      return;
    }
    if (!/^\d{6}$/.test(formDataState.pincode)) {
      setError('Please enter a valid 6-digit pincode.');
      setIsSubmitting(false);
      return;
    }

    try {
      const dataToPost = new URLSearchParams();
      for (const key in formDataState) {
        if (Object.prototype.hasOwnProperty.call(formDataState, key)) {
          const typedKey = key as keyof FormData;
          const value = formDataState[typedKey];
           // Use 'category' for businessCategory when posting to Google Sheet
          if (typedKey === 'businessCategory') {
            dataToPost.append('category', value);
          } else {
            dataToPost.append(key, value);
          }
        }
      }
      dataToPost.append('timestamp', new Date().toISOString());

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: dataToPost,
      });

      // WhatsApp Logic Moved Here
      const { firstName, lastName, businessCategory, phone, pincode, email } = formDataState;
      const fullName = `${firstName || ''} ${lastName || ''}`.trim() || "Valued Customer";
      const businessInfo = businessCategory || "their business";
      const contactPhone = phone || "N/A";
      const contactPincode = pincode || "N/A";
      const contactEmail = email || "Not provided";

      const message = `
Hello UK CREATION Team,

My name is ${fullName}.
I'm interested in your web presence solutions for my venture: ${businessInfo}.

My contact details are:
- Phone: ${contactPhone}
- Pincode: ${contactPincode}
- Email: ${contactEmail}

I've just submitted my information through your website form and would like to discuss how we can move forward.

Thank you,
${firstName || "Valued Customer"}
`.trim().replace(/^\s+/gm, "");

      const whatsappUrl = `https://wa.me/917894564870?text=${encodeURIComponent(message)}`;
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }
      // End of WhatsApp Logic

      setSuccessMessage("Form submitted successfully! Revealing prices...");
      setIsSubmitting(false); // Set submitting to false before timeout for onSubmitSuccess
      
      setTimeout(() => {
        onSubmitSuccess(formDataState); // This will now primarily handle UI changes in App.tsx
      }, 1500);

    } catch (caughtError) {
      console.error('Form submission error:', caughtError);
      setError('Failed to submit form. Please try again or check your network connection.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100] animate-fadeIn">
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-400/60">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">Unlock Your Exclusive Offer</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none" aria-label="Close modal">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(Object.keys(formDataState) as Array<keyof FormData>).map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-1">
                {fieldDisplayNames[field]}
              </label>
              {field === 'businessCategory' ? (
                <select
                  name={field}
                  id={field}
                  value={formDataState[field]}
                  onChange={handleChange}
                  required // Make sure a selection is made
                  className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-yellow-400 focus:border-yellow-400 ring-1 ring-gray-500/30 appearance-none"
                >
                  <option value="" disabled className="text-gray-500">Select your {fieldDisplayNames[field].toLowerCase()}</option>
                  {WHO_NEEDS_THIS_POINTS.map((category) => (
                    <option key={category} value={category} className="text-gray-200 bg-gray-700">
                      {category}
                    </option>
                  ))}
                  <option value="Others" className="text-gray-200 bg-gray-700">Others</option>
                </select>
              ) : (
                <input
                  type={field === 'email' ? 'email' : (field === 'phone' || field === 'pincode' ? 'tel' : 'text')}
                  name={field}
                  id={field}
                  value={formDataState[field]}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-yellow-400 focus:border-yellow-400 placeholder-gray-500 ring-1 ring-gray-500/30"
                  placeholder={`Enter your ${fieldDisplayNames[field].toLowerCase()}`}
                  required={field !== 'email'} // Email is optional
                  pattern={field === 'phone' ? '\\d{10}' : (field === 'pincode' ? '\\d{6}' : undefined)}
                  title={field === 'phone' ? 'Enter 10 digit phone number' : (field === 'pincode' ? 'Enter 6 digit pincode' : undefined)}
                />
              )}
            </div>
          ))}
          {error && <p className="text-red-400 text-sm p-2 bg-red-900/50 rounded border border-red-500/50">{error}</p>}
          {successMessage && <p className="text-green-400 text-sm p-2 bg-green-900/50 rounded border border-green-500/50">{successMessage}</p>}
          <button
            type="submit"
            disabled={isSubmitting || !!successMessage}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-md transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-yellow-600/50"
          >
            {isSubmitting ? 'Submitting...' : (successMessage ? 'Submitted!' : 'Submit & Reveal Prices')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingFormModal;
