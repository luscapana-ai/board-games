import React, { useState } from 'react';
import { ShieldCheck, Truck, Check, Lock, Package, Star, MapPin, AlertCircle } from 'lucide-react';
import { UserProfile, Order, OrderStatus } from '../types';

interface ProfileProps {
  user: UserProfile;
  orders: Order[];
  onReleaseFunds: (orderId: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, orders, onReleaseFunds }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'listings'>('orders');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-32 h-32 rounded-full border-4 border-indigo-50 shadow-md"
          />
          {user.isVerified && (
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white" title="Verified Meeple">
              <ShieldCheck className="w-5 h-5" />
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-indigo-600 font-medium">{user.handle}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {user.rating} Rating
            </span>
            <span>Member since {user.memberSince}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Seattle, WA
            </span>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-6 min-w-[200px] text-center">
            <div className="text-indigo-900 font-bold text-lg mb-1">Escrow Balance</div>
            <div className="text-3xl font-bold text-indigo-600">
               ${orders.filter(o => o.status === 'ESCROW_HELD').reduce((acc, o) => acc + o.total, 0).toFixed(2)}
            </div>
            <div className="text-xs text-indigo-400 mt-1">Funds held securely</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'orders' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Active Orders (Escrow)
        </button>
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'listings' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          My Listings
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No active orders</h3>
                <p className="text-gray-500">When you buy games, track your escrow status here.</p>
              </div>
            ) : (
              orders.map((order) => (
                <EscrowOrderCard key={order.id} order={order} onReleaseFunds={onReleaseFunds} />
              ))
            )}
          </div>
        )}

        {activeTab === 'listings' && (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                <h3 className="text-lg font-medium text-gray-900">No active listings</h3>
                <p className="text-gray-500 mb-6">You haven't listed any games for sale yet.</p>
                
                <div className="max-w-md mx-auto bg-blue-50 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-bold mb-1">Seller Fee Policy</p>
                    <p>MeepleMarket charges a <strong>3% platform fee</strong> on the final sale price of each item. This fee is automatically deducted from your payout when funds are released from Escrow.</p>
                  </div>
                </div>

                <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                    Sell a Game
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

const EscrowOrderCard: React.FC<{ order: Order; onReleaseFunds: (id: string) => void }> = ({ order, onReleaseFunds }) => {
  const steps = [
    { status: 'ESCROW_PENDING', label: 'Payment', icon: Lock },
    { status: 'ESCROW_HELD', label: 'Secured', icon: ShieldCheck },
    { status: 'SHIPPED', label: 'Shipped', icon: Truck },
    { status: 'COMPLETED', label: 'Released', icon: Check },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);
  // Simplify progress for demo: if status is Held, we show first 2 active. If Completed, all active.
  const isHeld = order.status === 'ESCROW_HELD';
  const isCompleted = order.status === 'COMPLETED';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">Order #{order.id} • {order.date.toLocaleDateString()}</div>
          <div className="font-bold text-gray-900 text-lg">Total: ${order.total.toFixed(2)}</div>
        </div>
        <div className="flex items-center gap-2">
           <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
             isCompleted ? 'bg-green-100 text-green-700' : 
             isHeld ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
           }`}>
             {order.status.replace('_', ' ')}
           </span>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Bar */}
        <div className="relative flex items-center justify-between mb-8 max-w-2xl mx-auto">
           <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
           <div className={`absolute top-1/2 left-0 h-1 bg-indigo-600 -z-10 rounded-full transition-all duration-500 ${
             isCompleted ? 'w-full' : isHeld ? 'w-1/2' : 'w-0'
           }`}></div>

           {steps.map((step, idx) => {
             const Icon = step.icon;
             const isActive = isCompleted || (isHeld && idx <= 1);
             return (
               <div key={step.status} className="flex flex-col items-center bg-white px-2">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                   isActive ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-200 text-gray-400 bg-white'
                 }`}>
                   <Icon className="w-5 h-5" />
                 </div>
                 <span className={`text-xs font-medium mt-2 ${isActive ? 'text-indigo-900' : 'text-gray-400'}`}>
                   {step.label}
                 </span>
               </div>
             )
           })}
        </div>

        {/* Order Items */}
        <div className="space-y-4">
          {order.items.map(item => (
            <div key={item.cartId} className="flex gap-4 items-center">
              <img src={item.game.image} alt={item.game.title} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
              <div>
                <h4 className="font-bold text-gray-900">{item.game.title}</h4>
                <p className="text-sm text-gray-500">{item.condition} • Sold by {item.seller}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      {isHeld && (
        <div className="bg-blue-50/50 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3 text-blue-800 text-sm">
             <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
             <p>Funds are currently held in a secure Escrow account. The seller has been notified to ship. Once you receive the item, please confirm to release the funds.</p>
          </div>
          <button 
            onClick={() => onReleaseFunds(order.id)}
            className="whitespace-nowrap px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Confirm Receipt & Release Funds
          </button>
        </div>
      )}
      
      {isCompleted && (
        <div className="bg-green-50/50 p-6 flex items-center gap-3 text-green-800 text-sm">
           <Check className="w-5 h-5 flex-shrink-0" />
           <p>Transaction completed. Funds have been released to the seller.</p>
        </div>
      )}
    </div>
  );
};