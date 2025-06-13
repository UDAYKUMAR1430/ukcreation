import React from 'react';
import { PricingTableProps, PricingItem } from '../types';
import { PRICING_DATA, ICON_URLS } from '../constants';
import Icon from './Icon';

const getIconForItem = (itemTitle: string): string => {
  const title = itemTitle.toLowerCase();
  if (title.includes("full website")) return ICON_URLS.hosting;
  if (title.includes("campaign page")) return ICON_URLS.campaignLogic;
  if (title.includes("booking form")) return ICON_URLS.form;
  if (title.includes("qr code")) return ICON_URLS.qrCode;
  if (title.includes("hosting")) return ICON_URLS.hosting;
  if (title.includes("creative flow")) return ICON_URLS.tools;
  if (title.includes("mobile friendly")) return ICON_URLS.mobileOptimized;
  if (title.includes("whatsapp logic")) return ICON_URLS.whatsapp;
  return ICON_URLS.check;
};

const PricingTable: React.FC<PricingTableProps> = ({ isVisible, onRevealPricesClick }) => {
  return (
    <section id="pricing" className="py-12 bg-gray-800 rounded-lg shadow-xl border border-gray-400/60">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">Think you're not like the rest?</h2>
        {!isVisible && (
          <div
            className="p-8 bg-gray-700 rounded-lg shadow-inner cursor-pointer hover:bg-gray-600 transition-colors animate-pulse border border-gray-400/60"
            onClick={onRevealPricesClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onRevealPricesClick()}
            aria-label="Reveal prices by filling form"
          >
            <p className="text-2xl font-semibold text-yellow-400 flex items-center justify-center">
              <Icon iconUrl={ICON_URLS.lock} altText="" size={28} wrapperClassName="bg-transparent ring-0 !p-0" className="mr-2 text-yellow-400" />
              Prove it. Click to reveal.
            </p>
            <p className="text-sm text-gray-300 mt-2">Fill a quick form to unlock exclusive pricing.</p>
          </div>
        )}
        {isVisible && (
          <div className="overflow-x-auto transition-opacity duration-1000 ease-in-out opacity-100 animate-fadeIn">
            <table className="min-w-full bg-gray-700 text-gray-200 rounded-lg shadow-md border border-gray-400/60">
              <thead className="bg-gray-900 text-yellow-400">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Item</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider hidden md:table-cell">What You Get</th>
                  <th className="py-3 px-4 text-right text-sm font-semibold uppercase tracking-wider">Value</th>
                  <th className="py-3 px-4 text-right text-sm font-semibold uppercase tracking-wider">Offered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {PRICING_DATA.map((item: PricingItem, index: number) => (
                  <tr key={index} className="hover:bg-gray-600 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Icon iconUrl={getIconForItem(item.item)} altText={item.item} size={20} wrapperClassName="bg-gray-800" className="mr-3"/>
                        {item.item}
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">{item.description}</td>
                    <td className="py-4 px-4 text-right line-through text-gray-400">{item.value}</td>
                    <td className="py-4 px-4 text-right font-bold text-yellow-400 text-lg">{item.offered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-green-400 flex items-center justify-center">
             <Icon iconUrl={ICON_URLS.check} altText="" size={20} wrapperClassName="bg-transparent ring-0 !p-0" className="mr-1 text-green-400" />
              Prices unlocked successfully!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingTable;
