import React from 'react';
import { X, Trash2, ShoppingBag, Receipt } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (cartId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const buyerFee = items.length > 0 ? 1.00 : 0;
  const total = subtotal + buyerFee;

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 text-indigo-900">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-xl font-bold">Your Cart</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Your cart is empty.</p>
              <button onClick={onClose} className="text-indigo-600 hover:text-indigo-800 font-medium">
                Browse Bazaar
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartId} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 group">
                <img 
                  src={item.game.image} 
                  alt={item.game.title} 
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{item.game.title}</h3>
                  <p className="text-sm text-gray-500">Condition: {item.condition}</p>
                  <p className="text-indigo-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => onRemoveItem(item.cartId)}
                  className="self-start p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 space-y-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span className="flex items-center gap-1"><Receipt className="w-3 h-3" /> Buyer Fee</span>
                <span>${buyerFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-100 my-2"></div>
              <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={onCheckout}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Secure Checkout
            </button>
            <p className="text-center text-xs text-gray-400">
              Payments are held in Escrow until you confirm receipt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};