import React, { useState, useMemo } from 'react';
import { Search, Users, Clock, Brain, Star, X, Sparkles, ArrowRight } from 'lucide-react';
import { BoardGame } from '../types';
import { ALPHABET } from '../constants';

interface GameLibraryProps {
  games: BoardGame[];
}

export const GameLibrary: React.FC<GameLibraryProps> = ({ games }) => {
  const [filterLetter, setFilterLetter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<BoardGame | null>(null);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesLetter = filterLetter === '' || filterLetter === '#' 
        ? true 
        : game.title.toUpperCase().startsWith(filterLetter);
        
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           game.category.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesLetter && matchesSearch;
    }).sort((a, b) => a.title.localeCompare(b.title));
  }, [games, filterLetter, searchQuery]);

  const similarGames = useMemo(() => {
    if (!selectedGame) return [];
    return games.filter(g => 
      g.id !== selectedGame.id && 
      g.category.some(c => selectedGame.category.includes(c))
    ).slice(0, 3);
  }, [selectedGame, games]);

  return (
    <div className="space-y-8 animate-fade-in relative">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-indigo-950">The Great Library</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Explore our extensive collection of board games. Filter by starting letter or search for specific titles.</p>
      </div>

      {/* Controls */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search games, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
        </div>

        {/* A-Z Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
             onClick={() => setFilterLetter('')}
             className={`px-3 py-1 text-sm font-medium rounded-lg transition-all ${
               filterLetter === '' 
                 ? 'bg-indigo-600 text-white shadow-md' 
                 : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
             }`}
          >
            ALL
          </button>
          {ALPHABET.map(letter => (
            <button
              key={letter}
              onClick={() => setFilterLetter(letter === '#' ? '' : letter)}
              className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-all ${
                filterLetter === letter 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-400">
            <p className="text-xl">No games found matching your criteria.</p>
          </div>
        ) : (
          filteredGames.map(game => (
            <div 
              key={game.id} 
              onClick={() => setSelectedGame(game)}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 flex flex-col h-full cursor-pointer active:scale-[0.98]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-indigo-900 text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {game.rating}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-2 flex flex-wrap gap-1">
                  {game.category.slice(0, 2).map(cat => (
                    <span key={cat} className="text-[10px] uppercase tracking-wider font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{game.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">{game.description}</p>
                
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                  <div className="flex flex-col items-center text-center">
                    <Users className="w-4 h-4 text-gray-400 mb-1" />
                    <span className="text-xs font-medium text-gray-700">{game.players}</span>
                  </div>
                  <div className="flex flex-col items-center text-center border-l border-gray-100">
                    <Clock className="w-4 h-4 text-gray-400 mb-1" />
                    <span className="text-xs font-medium text-gray-700">{game.playtime}</span>
                  </div>
                  <div className="flex flex-col items-center text-center border-l border-gray-100">
                    <Brain className="w-4 h-4 text-gray-400 mb-1" />
                    <span className="text-xs font-medium text-gray-700">{game.weight}/5</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Game Details Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedGame(null)} />
          
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
            <button 
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            {/* Left/Top: Image */}
            <div className="md:w-2/5 h-64 md:h-auto relative">
              <img 
                src={selectedGame.image} 
                alt={selectedGame.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                   <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                   <span className="text-2xl font-bold">{selectedGame.rating}</span>
                   <span className="text-white/80 text-sm">/ 10</span>
                </div>
                <div className="flex flex-wrap gap-2">
                   {selectedGame.category.map(cat => (
                     <span key={cat} className="px-2 py-1 bg-white/20 backdrop-blur rounded-md text-xs font-medium">
                       {cat}
                     </span>
                   ))}
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1 p-8 overflow-y-auto">
               <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedGame.title}</h2>
               
               <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium">{selectedGame.players} Players</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium">{selectedGame.playtime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium">Weight: {selectedGame.weight}/5</span>
                  </div>
               </div>

               <div className="space-y-4 mb-8">
                 <h3 className="text-lg font-bold text-gray-900">About this game</h3>
                 <p className="text-gray-600 leading-relaxed">
                   {selectedGame.description}
                 </p>
                 <p className="text-gray-600 leading-relaxed">
                   Dive into a world of strategy and chance. {selectedGame.title} offers a unique experience 
                   blending {selectedGame.category.join(' and ')} mechanics suitable for ages {selectedGame.age}.
                 </p>
               </div>

               {/* Similar Games Section */}
               {similarGames.length > 0 && (
                 <div className="bg-slate-50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4 text-indigo-900">
                       <Sparkles className="w-5 h-5" />
                       <h3 className="font-bold">You might also like</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {similarGames.map(sim => (
                        <div 
                          key={sim.id} 
                          onClick={() => setSelectedGame(sim)}
                          className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all group"
                        >
                          <img src={sim.image} alt={sim.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                          <div className="font-bold text-sm text-gray-900 truncate">{sim.title}</div>
                          <div className="text-xs text-indigo-600 flex items-center gap-1 mt-1 group-hover:gap-2 transition-all">
                             View <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};