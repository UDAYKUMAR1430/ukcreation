
import React, { useState, useCallback } from 'react';
import { WHY_THIS_MATTERS_DATA, ICON_URLS, SPINNER_LOGO_URL } from '../constants';
import { WhyThisMattersItem, GeminiInsightsState } from '../types';
import { fetchGeminiInsights } from '../services/geminiService';
import Icon from './Icon';

const WhyThisMatters: React.FC = () => {
  const [expandedReasonTitle, setExpandedReasonTitle] = useState<string | null>(null);
  const [reasonInsights, setReasonInsights] = useState<Record<string, GeminiInsightsState>>({});

  const generateReasonInsights = useCallback(async (item: WhyThisMattersItem) => {
    setReasonInsights(prev => ({
      ...prev,
      [item.title]: { insights: [], isLoading: true, error: null }
    }));

    const prompt = `You are an elite branding strategist for UK CREATION, a company that builds premium, lead-generating websites.
For the core business principle titled "${item.title}", described as: "${item.description}", generate 3-4 powerful insights.
Each insight should be a short, impactful statement (around 10-20 words) explaining why this principle is crucial for a business's success in the digital age AND subtly hinting how a UK CREATION webpage helps them master this.
Use a confident, aspirational, and slightly exclusive brand voice. Avoid generic marketing jargon.
Provide each insight on a new line, without any bullet point markers (like '-', '*') or numbering. Just raw text lines.`;

    const result = await fetchGeminiInsights(prompt, 4);

    if (result.data) {
      setReasonInsights(prev => ({
        ...prev,
        [item.title]: { insights: result.data!, isLoading: false, error: null }
      }));
    } else {
      setReasonInsights(prev => ({
        ...prev,
        [item.title]: { insights: [], isLoading: false, error: result.error || `No specific insights generated for ${item.title}.` }
      }));
    }
  }, []);

  const handlePanelToggle = (item: WhyThisMattersItem) => {
    if (expandedReasonTitle === item.title) {
      setExpandedReasonTitle(null);
    } else {
      setExpandedReasonTitle(item.title);
      if (!reasonInsights[item.title] || (!reasonInsights[item.title].isLoading && (reasonInsights[item.title].insights.length === 0 || reasonInsights[item.title].error))) {
        generateReasonInsights(item);
      }
    }
  };

  return (
    <section className="py-12 border border-gray-400/60 rounded-lg shadow-xl bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-10 text-center">SOLID REASONS</h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {WHY_THIS_MATTERS_DATA.map((item, index) => {
            const isOpen = expandedReasonTitle === item.title;
            const currentItemInsights = reasonInsights[item.title];
            return (
              <div key={index} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-400/60">
                <button
                  onClick={() => handlePanelToggle(item)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-gray-700/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-expanded={isOpen}
                  aria-controls={`insights-panel-${index}`}
                >
                  <div className="flex items-start space-x-4">
                    <Icon iconUrl={item.iconUrl} altText={item.title} size={32} wrapperClassName="bg-gray-900" className="mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-yellow-400 mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-md lg:text-lg">{item.description}</p>
                    </div>
                  </div>
                  <Icon
                    iconUrl={ICON_URLS.chevronDown}
                    altText={isOpen ? "Collapse" : "Expand"}
                    size={24}
                    wrapperClassName="bg-transparent"
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} text-yellow-400 ml-4 flex-shrink-0`}
                  />
                </button>
                <div
                  id={`insights-panel-${index}`}
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <div className="p-5 md:p-6 border-t border-gray-700">
                    {currentItemInsights?.isLoading && (
                       <div className="flex flex-col items-center justify-center space-y-3 py-4">
                        <div className="relative w-12 h-12">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                          <img src={SPINNER_LOGO_URL} alt="Loading..." className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 object-contain"/>
                        </div>
                        <p className="text-yellow-400 mt-2">Crafting exclusive insights...</p>
                      </div>
                    )}
                    {!currentItemInsights?.isLoading && currentItemInsights?.error && (
                      <div className="text-red-400 bg-red-900/30 p-4 rounded-md my-2 border border-red-500/50">
                        <p className="font-semibold text-lg">Insights Unavailable</p>
                        <p className="text-sm mt-1">{currentItemInsights.error}</p>
                      </div>
                    )}
                    {!currentItemInsights?.isLoading && !currentItemInsights?.error && currentItemInsights?.insights && currentItemInsights.insights.length > 0 && (
                      <div className="text-left w-full">
                        <h4 className="text-xl lg:text-2xl font-bold text-white mb-4 text-center">
                          {item.title}
                        </h4>
                        <ul className="list-none space-y-3">
                          {currentItemInsights.insights.map((insight, idx) => (
                            <li key={idx} className="flex items-start p-3 bg-gray-700/80 rounded-md shadow hover:bg-gray-700 transition-colors">
                              <Icon
                                iconUrl={ICON_URLS.arrowRight}
                                altText="Insight"
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
                     {!currentItemInsights?.isLoading && !currentItemInsights?.error && currentItemInsights?.insights && currentItemInsights.insights.length === 0 && (
                      <p className="text-gray-400 text-base py-4">
                        No specific insights could be generated at this time. API key might be missing.
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

export default WhyThisMatters;
