
import React, { useState, useCallback } from 'react';
import { WHO_NEEDS_THIS_POINTS, ICON_URLS, SPINNER_LOGO_URL } from '../constants';
import { fetchGeminiInsights } from '../services/geminiService';
import Icon from './Icon';

const WhoNeedsThis: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [advantages, setAdvantages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateAdvantages = useCallback(async (categoryName: string) => {
    setIsLoading(true);
    setError(null);
    setAdvantages([]);

    const prompt = `You are an expert marketing copywriter.
For a business category '${categoryName}', generate exactly 5 unique and compelling bullet points.
Each bullet point must be an impressive 'cold message' highlighting a key advantage of having a professional webpage for that specific category.
Focus on tangible benefits like increased trust, wider reach, enhanced credibility, direct customer engagement, and a strong competitive edge, tailored to '${categoryName}'.
Ensure each bullet point is concise (ideally under 15-20 words) and starts with an impactful statement or action verb.
Format the output as 5 distinct bullet points, each on a new line. Do not use any numbering or markdown list prefixes (like '-', '*', or numbers). Just provide the raw text for each point.`;

    const result = await fetchGeminiInsights(prompt, 5);

    if (result.data) {
      setAdvantages(result.data);
    } else {
      setError(result.error || `Could not generate specific advantages for ${categoryName}.`);
      setAdvantages([]);
    }
    setIsLoading(false);
  }, []);

  const handlePanelClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setAdvantages([]);
      setError(null);
    } else {
      setSelectedCategory(categoryName);
      generateAdvantages(categoryName);
    }
  };

  return (
    <section className="py-12 bg-gray-900 rounded-lg shadow-xl border border-gray-400/60">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">WHO IS THIS FOR?</h2>
        <p className="text-xl md:text-2xl font-semibold text-yellow-400 mb-10">
          The smarter way to start your digital journey – crafted for those who dream big, hustle hard, and want to be seen right.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHO_NEEDS_THIS_POINTS.map((category, index) => {
            const isOpen = selectedCategory === category;
            return (
              <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-400/60">
                <button
                  onClick={() => handlePanelClick(category)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-yellow-400 hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-expanded={isOpen}
                  aria-controls={`advantages-panel-${index}`}
                >
                  <span className="text-xl font-semibold">{category}</span>
                  <Icon
                    iconUrl={ICON_URLS.chevronDown}
                    altText={isOpen ? "Collapse" : "Expand"}
                    size={20}
                    wrapperClassName="bg-transparent"
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  />
                </button>
                <div
                  id={`advantages-panel-${index}`}
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <div className="p-5 border-t border-gray-700">
                    {isLoading && isOpen && (
                      <div className="flex flex-col items-center justify-center space-y-3 py-4">
                        <div className="relative w-12 h-12">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                          <img src={SPINNER_LOGO_URL} alt="Loading..." className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 object-contain"/>
                        </div>
                        <p className="text-yellow-400">Fetching advantages...</p>
                      </div>
                    )}
                    {!isLoading && error && isOpen && (
                      <div className="text-red-400 bg-red-900/30 p-4 rounded-md my-2 border border-red-500/50">
                        <p className="font-semibold text-lg">Oops! Something went wrong.</p>
                        <p className="text-sm mt-1">{error}</p>
                      </div>
                    )}
                    {!isLoading && !error && isOpen && advantages.length > 0 && (
                      <div className="text-left w-full">
                        <h4 className="text-xl font-bold text-white mb-3 text-center">
                          {category}
                        </h4>
                        <p className="text-base text-gray-300 italic mb-4 text-center">
                          Discover Why a Professional Webpage is a <strong className="text-yellow-400">Must-Have</strong> for Your Success!
                        </p>
                        <ul className="list-none space-y-3">
                          {advantages.map((advantage, idx) => (
                            <li key={idx} className="flex items-start p-3 bg-gray-700/80 rounded-md shadow-sm hover:bg-gray-700 transition-colors">
                              <Icon
                                iconUrl={ICON_URLS.arrowRight}
                                altText="Advantage"
                                size={18}
                                wrapperClassName="bg-transparent"
                                className="mr-3 mt-1 flex-shrink-0"
                              />
                              <span className="text-gray-200 text-base">{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {!isLoading && !error && isOpen && advantages.length === 0 && (
                      <p className="text-gray-400 text-base py-4">
                        No specific advantages could be generated at this time. Please try again or API key might be missing.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-lg md:text-xl text-gray-200 mt-12 font-semibold">
          If you're just starting or want to upgrade your digital identity this is for YOU.
        </p>
      </div>
    </section>
  );
};

export default WhoNeedsThis;
