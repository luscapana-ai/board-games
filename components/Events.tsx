import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Trophy, HeartHandshake, BookOpen, CheckCircle } from 'lucide-react';
import { GameEvent } from '../types';

interface EventsProps {
  events: GameEvent[];
}

export const Events: React.FC<EventsProps> = ({ events }) => {
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(new Set());

  const handleJoin = (id: string) => {
    setJoinedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getTypeIcon = (type: GameEvent['type']) => {
    switch (type) {
      case 'Tournament': return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'Social': return <HeartHandshake className="w-5 h-5 text-pink-500" />;
      case 'Learn-to-Play': return <BookOpen className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Events</h1>
          <p className="text-orange-50 text-lg max-w-xl">
            Join local game nights, tournaments, and learn-to-play sessions. 
            Meet fellow meeples and discover your next favorite game.
          </p>
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex flex-col md:flex-row">
            <div className="md:w-48 h-48 md:h-auto relative shrink-0">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold shadow-sm uppercase tracking-wider flex items-center gap-1.5">
                {getTypeIcon(event.type)}
                {event.type}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{event.title}</h3>
                   <div className="flex items-center text-sm text-gray-500 gap-4">
                     <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
                     <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</span>
                   </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex flex-col gap-1">
                   <div className="flex items-center text-xs text-gray-500 gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {event.location}
                   </div>
                   <div className="flex items-center text-xs text-gray-500 gap-1.5">
                      <Users className="w-3.5 h-3.5" /> {event.attendees} going
                   </div>
                </div>

                <button 
                  onClick={() => handleJoin(event.id)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    joinedEvents.has(event.id)
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'
                  }`}
                >
                  {joinedEvents.has(event.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> Going
                    </>
                  ) : (
                    "RSVP"
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};