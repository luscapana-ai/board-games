export interface BoardGame {
  id: string;
  title: string;
  description: string;
  category: string[];
  players: string;
  playtime: string;
  age: string;
  image: string;
  rating: number;
  weight: number; // Complexity 1-5
}

export interface MarketListing {
  id: string;
  gameId: string;
  game: BoardGame;
  price: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  seller: string;
  postedDate: string;
}

export interface CartItem extends MarketListing {
  cartId: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export type OrderStatus = 'ESCROW_PENDING' | 'ESCROW_HELD' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED' | 'DISPUTED';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: OrderStatus;
  buyerId: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isVerified: boolean;
  rating: number;
  memberSince: string;
}

export interface GameEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  type: 'Tournament' | 'Social' | 'Learn-to-Play';
  description: string;
}

export enum AppView {
  LIBRARY = 'LIBRARY',
  MARKETPLACE = 'MARKETPLACE',
  EVENTS = 'EVENTS',
  GURU = 'GURU',
  PROFILE = 'PROFILE'
}