import React, { useState } from 'react';
import { ShoppingCart, Filter, Tag, Plus } from 'lucide-react';
import { MarketListing } from '../types';

interface MarketplaceProps {
  listings: MarketListing[];
  onAddToCart: (listing: MarketListing) => void;
  onListItem: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ listings, onAddToCart, onListItem }) => {
  const [filterCondition, setFilterCondition] = useState<string>('All');

  const filteredListings = listings.filter(item => 
    filterCondition === 'All' || item.condition === filterCondition
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Grand Bazaar</h1>
          <p className="text-indigo-200 text-lg max-w-xl">
            Find hidden gems, pre-loved classics, and rare editions from fellow board game enthusiasts. 
            Safe trading, verified meeples.
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sticky top-20 z-20 bg-white/90 backdrop-blur p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'New', 'Like New', 'Good', 'Fair'].map(condition => (
              <button
                key={condition}
                onClick={() => setFilterCondition(condition)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filterCondition === condition
                    ? 'bg-indigo-100 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={onListItem}
          className="w-full lg:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-indigo-200 hover:shadow-lg active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Sell Game
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings.map(listing => (
          <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={listing.game.image} 
                alt={listing.game.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-white/95 backdrop-blur text-gray-900 font-bold px-3 py-1 rounded-full text-sm shadow-sm">
                  ${listing.price.toFixed(2)}
                </span>
              </div>
              <div className="absolute bottom-2 left-2">
                 <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide text-white shadow-sm ${
                   listing.condition === 'New' ? 'bg-green-500' : 
                   listing.condition === 'Like New' ? 'bg-blue-500' : 'bg-orange-500'
                 }`}>
                   {listing.condition}
                 </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{listing.game.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Tag className="w-3 h-3 mr-1" />
                Seller: {listing.seller}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                 <div className="text-xs text-gray-400">
                   Posted: {listing.postedDate}
                 </div>
                 <button 
                  onClick={() => onAddToCart(listing)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-indigo-200 shadow-md"
                 >
                   <ShoppingCart className="w-4 h-4" />
                   Add to Cart
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};