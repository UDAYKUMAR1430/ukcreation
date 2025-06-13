
import React, { useState, useCallback } from 'react';
import { ICON_PANEL_ITEMS, ICON_URLS, SPINNER_LOGO_URL } from '../constants';
import { IconPanelItem, GeminiInsightsState } from '../types';
import { fetchGeminiInsights } from '../services/geminiService';
import Icon from './Icon';

const IconPanel: React.FC = () => {
  const [expandedItemName, setExpandedItemName] = useState<string | null>(null);
  const [itemInsights, setItemInsights] = useState<Record<string, GeminiInsightsState>>({});

  const generateFeatureInsights = useCallback(async (itemName: string) => {
    setItemInsights(prev => ({
      ...prev,
      [itemName]: { insights: [], isLoading: true, error: null }
    }));

    const prompt = `You are a persuasive digital marketing assistant for UK CREATION.
For the web feature named '${itemName}', generate exactly 5 concise 'cold' bullet points.
Each bullet point should highlight a crucial benefit this feature offers when part of a professional website designed by UK CREATION.
Focus on direct business advantages like increased efficiency, better customer engagement, enhanced professionalism, or improved lead conversion, tailored to '${itemName}'.
Frame them as if you're quickly convincing a busy business owner of its value.
Ensure each point is short (10-20 words).
Provide each point on a new line. Do not use any numbering or markdown list prefixes (like '-', '*', or numbers). Just provide the raw text for each point.`;

    const result = await fetchGeminiInsights(prompt, 5);
    if (result.data) {
      setItemInsights(prev => ({
        ...prev,
        [itemName]: { insights: result.data!, isLoading: false, error: null }
      }));
    } else {
      setItemInsights(prev => ({
        ...prev,
        [itemName]: { insights: [], isLoading: false, error: result.error || `No specific insights generated for ${itemName}.` }
      }));
    }
  }, []);

  const handlePanelToggle = (itemName: string) => {
    if (expandedItemName === itemName) {
      setExpandedItemName(null);
    } else {
      setExpandedItemName(itemName);
      if (!itemInsights[itemName] || (!itemInsights[itemName].isLoading && (itemInsights[itemName].insights.length === 0 || itemInsights[itemName].error))) {
        generateFeatureInsights(itemName);
      }
    }
  };

  return (
    <section className="py-12 border border-gray-400/60 rounded-lg shadow-xl bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-10 text-center">KEY FEATURES & BENEFITS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ICON_PANEL_ITEMS.map((item: IconPanelItem, index: number) => {
            const isOpen = expandedItemName === item.name;
            const currentItemState = itemInsights[item.name];
            const isGoogleSheet = item.name === "Google Sheet";
            return (
              <div key={item.name} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-400/60">
                <button
                  onClick={() => handlePanelToggle(item.name)}
                  className="w-full flex flex-col items-center justify-center p-5 text-center hover:bg-gray-700/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-expanded={isOpen}
                  aria-controls={`feature-insights-${index}`}
                >
                  {isGoogleSheet ? (
                    <div className="bg-black rounded-[12px] p-1 mb-3 ring-0 w-10 h-10 flex items-center justify-center">
                      <img src={item.iconUrl} alt={item.name} width="64" height="64" className="object-contain w-full h-full" />
                    </div>
                  ) : (
                    <Icon iconUrl={item.iconUrl} altText={item.name} size={32} wrapperClassName={"bg-black"} className="mb-3" />
                  )}
                  <p className="text-xl font-semibold text-gray-200 mb-1">{item.name}</p>
                  <Icon
                    iconUrl={ICON_URLS.chevronDown}
                    altText={isOpen ? "Collapse" : "Expand"}
                    size={20}
                    wrapperClassName="bg-transparent"
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} text-yellow-400 mt-1`}
                  />
                </button>
                <div
                  id={`feature-insights-${index}`}
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <div className="p-5 border-t border-gray-700">
                    {currentItemState?.isLoading && (
                       <div className="flex flex-col items-center justify-center space-y-3 py-4">
                        <div className="relative w-12 h-12">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                          <img src={SPINNER_LOGO_URL} alt="Loading..." className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 object-contain"/>
                        </div>
                        <p className="text-yellow-400 mt-2">Fetching benefits...</p>
                      </div>
                    )}
                    {!currentItemState?.isLoading && currentItemState?.error && (
                      <div className="text-red-400 bg-red-900/30 p-4 rounded-md my-2 text-center border border-red-500/50">
                        <p className="font-semibold text-lg">Benefits Unavailable</p>
                        <p className="text-sm mt-1">{currentItemState.error}</p>
                      </div>
                    )}
                    {!currentItemState?.isLoading && !currentItemState?.error && currentItemState?.insights && currentItemState.insights.length > 0 && (
                      <div className="text-left w-full">
                        <h4 className="text-lg font-semibold text-yellow-300 mb-3 text-center">
                          Unlock the Power of <span className="underline decoration-wavy decoration-yellow-500 font-bold">{item.name}</span>:
                        </h4>
                        <ul className="list-none space-y-3">
                          {currentItemState.insights.map((insight, idx) => (
                            <li key={idx} className="flex items-start p-3 bg-gray-700/80 rounded-md shadow hover:bg-gray-700 transition-colors">
                             <Icon
                                iconUrl={ICON_URLS.arrowRight}
                                altText="Benefit"
                                size={18}
                                wrapperClassName="bg-transparent"
                                className="mr-3 mt-1 flex-shrink-0"
                              />
                              <span className="text-gray-200 text-base">{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {!currentItemState?.isLoading && !currentItemState?.error && currentItemState?.insights && currentItemState.insights.length === 0 && (
                       <p className="text-gray-400 text-base py-4 text-center">
                        No specific benefits could be generated at this time. API key might be missing.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IconPanel;
