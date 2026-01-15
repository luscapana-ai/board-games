import React from 'react';
import { LayoutGrid, ShoppingBag, MessageSquare, Menu, Dices, UserCircle, CalendarDays } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView, cartCount, onOpenCart }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChangeView(AppView.LIBRARY)}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Dices className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Meeple<span className="text-indigo-600">Market</span></span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-gray-100/50 p-1.5 rounded-xl">
            {[
              { id: AppView.LIBRARY, label: 'Library', icon: LayoutGrid },
              { id: AppView.MARKETPLACE, label: 'Bazaar', icon: ShoppingBag },
              { id: AppView.EVENTS, label: 'Events', icon: CalendarDays },
              { id: AppView.GURU, label: 'Game Guru', icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangeView(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'fill-current' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Cart & Profile Trigger */}
          <div className="flex items-center gap-3">
             <button 
               onClick={onOpenCart}
               className="relative p-2.5 bg-white text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 border border-gray-200 rounded-xl transition-all group"
               aria-label="Open Cart"
             >
               <ShoppingBag className="w-5 h-5" />
               {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                   {cartCount}
                 </span>
               )}
             </button>

             <button
                onClick={() => onChangeView(AppView.PROFILE)}
                className={`p-2.5 border border-gray-200 rounded-xl transition-all ${
                  currentView === AppView.PROFILE 
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-200' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Profile"
             >
                <UserCircle className="w-5 h-5" />
             </button>

             {/* Mobile Menu Button */}
             <button className="md:hidden p-2 text-gray-500">
               <Menu className="w-6 h-6" />
             </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav (Simple) */}
      <div className="md:hidden border-t border-gray-100 flex justify-around p-2 bg-white">
          {[
              { id: AppView.LIBRARY, icon: LayoutGrid },
              { id: AppView.MARKETPLACE, icon: ShoppingBag },
              { id: AppView.EVENTS, icon: CalendarDays },
              { id: AppView.GURU, icon: MessageSquare },
              { id: AppView.PROFILE, icon: UserCircle },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`p-2 rounded-lg ${currentView === item.id ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400'}`}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
      </div>
    </nav>
  );
};