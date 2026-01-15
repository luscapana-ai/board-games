import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { GameLibrary } from './components/GameLibrary';
import { Marketplace } from './components/Marketplace';
import { GameGuru } from './components/GameGuru';
import { CartDrawer } from './components/CartDrawer';
import { Profile } from './components/Profile';
import { Events } from './components/Events';
import { AppView, MarketListing, CartItem, Order, UserProfile } from './types';
import { MOCK_GAMES, MOCK_MARKET, MOCK_USER, MOCK_EVENTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LIBRARY);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUser] = useState<UserProfile>(MOCK_USER);

  const addToCart = (listing: MarketListing) => {
    const newItem: CartItem = { ...listing, cartId: Math.random().toString(36).substr(2, 9) };
    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const buyerFee = 1.00;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cartItems],
      total: subtotal + buyerFee,
      date: new Date(),
      status: 'ESCROW_HELD', // Immediately go to held for demo purposes
      buyerId: currentUser.id
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    setCurrentView(AppView.PROFILE);
  };

  const handleReleaseFunds = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'COMPLETED' } : order
    ));
  };

  const handleListGame = () => {
    alert("Listing Wizard coming soon! Sellers will be charged a 3% fee upon sale.");
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.LIBRARY:
        return <GameLibrary games={MOCK_GAMES} />;
      case AppView.MARKETPLACE:
        return <Marketplace 
          listings={MOCK_MARKET} 
          onAddToCart={addToCart}
          onListItem={handleListGame}
        />;
      case AppView.EVENTS:
        return <Events events={MOCK_EVENTS} />;
      case AppView.GURU:
        return <GameGuru games={MOCK_GAMES} />;
      case AppView.PROFILE:
        return (
          <Profile 
            user={currentUser} 
            orders={orders} 
            onReleaseFunds={handleReleaseFunds} 
          />
        );
      default:
        return <GameLibrary games={MOCK_GAMES} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <Navbar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {renderContent()}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;