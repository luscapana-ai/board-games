import { BoardGame, MarketListing, UserProfile, GameEvent } from './types';

export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Alex Meeple',
  handle: '@BoardGameGeek99',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  isVerified: true,
  rating: 4.8,
  memberSince: 'Sep 2021'
};

export const MOCK_GAMES: BoardGame[] = [
  {
    id: 'g1',
    title: 'Agricola',
    description: 'A game of farming, raising livestock, and feeding your family in 17th century Europe.',
    category: ['Strategy', 'Farming', 'Economic'],
    players: '1-5',
    playtime: '30-150m',
    age: '12+',
    image: 'https://picsum.photos/seed/agricola/400/400',
    rating: 8.1,
    weight: 3.64
  },
  {
    id: 'g12',
    title: '7 Wonders Duel',
    description: 'An intense two-player card drafting game where you build an ancient civilization.',
    category: ['Strategy', 'Card Game', 'City Building'],
    players: '2',
    playtime: '30m',
    age: '10+',
    image: 'https://picsum.photos/seed/7wonders/400/400',
    rating: 8.1,
    weight: 2.23
  },
  {
    id: 'g13',
    title: 'Ark Nova',
    description: 'Plan and build a modern, scientifically managed zoo.',
    category: ['Strategy', 'Animals', 'Economic'],
    players: '1-4',
    playtime: '90-150m',
    age: '14+',
    image: 'https://picsum.photos/seed/arknova/400/400',
    rating: 8.5,
    weight: 3.7
  },
  {
    id: 'g2',
    title: 'Azul',
    description: 'Draft beautiful tiles to decorate the walls of the Royal Palace of Evora.',
    category: ['Abstract', 'Pattern Building'],
    players: '2-4',
    playtime: '30-45m',
    age: '8+',
    image: 'https://picsum.photos/seed/azul/400/400',
    rating: 7.8,
    weight: 1.76
  },
  {
    id: 'g14',
    title: 'Blood Rage',
    description: 'Viking clans pillage and battle in a quest for glory before the world ends.',
    category: ['Strategy', 'Wargame', 'Fantasy'],
    players: '2-4',
    playtime: '60-90m',
    age: '14+',
    image: 'https://picsum.photos/seed/bloodrage/400/400',
    rating: 8.0,
    weight: 2.8
  },
  {
    id: 'g3',
    title: 'Brass: Birmingham',
    description: 'Build networks, grow industries, and navigate the competing demands of the Iron Rails era.',
    category: ['Strategy', 'Economic', 'Industrial'],
    players: '2-4',
    playtime: '60-120m',
    age: '14+',
    image: 'https://picsum.photos/seed/brass/400/400',
    rating: 8.7,
    weight: 3.9
  },
  {
    id: 'g15',
    title: 'Cascadia',
    description: 'A puzzly tile-laying and token-drafting game featuring the habitats and wildlife of the Pacific Northwest.',
    category: ['Abstract', 'Animals', 'Puzzle'],
    players: '1-4',
    playtime: '30-45m',
    age: '10+',
    image: 'https://picsum.photos/seed/cascadia/400/400',
    rating: 7.9,
    weight: 1.8
  },
  {
    id: 'g4',
    title: 'Catan',
    description: 'Collect and trade resources to build up the island of Catan in this modern classic.',
    category: ['Strategy', 'Negotiation'],
    players: '3-4',
    playtime: '60-120m',
    age: '10+',
    image: 'https://picsum.photos/seed/catan/400/400',
    rating: 7.1,
    weight: 2.3
  },
  {
    id: 'g16',
    title: 'Concordia',
    description: 'Peaceful strategy game of economic development in Roman times.',
    category: ['Strategy', 'Economic', 'Ancient'],
    players: '2-5',
    playtime: '100m',
    age: '13+',
    image: 'https://picsum.photos/seed/concordia/400/400',
    rating: 8.1,
    weight: 3.0
  },
  {
    id: 'g17',
    title: 'Decrypto',
    description: 'A party game where two teams compete to decode their teammates\' messages without being intercepted.',
    category: ['Party', 'Word Game', 'Deduction'],
    players: '3-8',
    playtime: '15-45m',
    age: '12+',
    image: 'https://picsum.photos/seed/decrypto/400/400',
    rating: 7.8,
    weight: 1.8
  },
  {
    id: 'g5',
    title: 'Dune: Imperium',
    description: 'Deck-building meets worker placement in a struggle for control over the spice on Arrakis.',
    category: ['Strategy', 'Sci-Fi', 'Card Game'],
    players: '1-4',
    playtime: '60-120m',
    age: '14+',
    image: 'https://picsum.photos/seed/dune/400/400',
    rating: 8.3,
    weight: 3.0
  },
  {
    id: 'g18',
    title: 'Eclipse: Second Dawn for the Galaxy',
    description: 'A game of grand strategy and space combat with 4X elements.',
    category: ['Sci-Fi', 'Wargame', 'Strategy'],
    players: '2-6',
    playtime: '60-200m',
    age: '14+',
    image: 'https://picsum.photos/seed/eclipse/400/400',
    rating: 8.7,
    weight: 3.6
  },
  {
    id: 'g6',
    title: 'Everdell',
    description: 'A charming game of building a city of critters beneath the boughs of the Ever Tree.',
    category: ['Strategy', 'Animals', 'Card Game'],
    players: '1-4',
    playtime: '40-80m',
    age: '13+',
    image: 'https://picsum.photos/seed/everdell/400/400',
    rating: 8.0,
    weight: 2.8
  },
  {
    id: 'g7',
    title: 'Gloomhaven',
    description: 'A tactical combat dungeon crawler with a persistent, changing world.',
    category: ['Thematic', 'Adventure', 'Fantasy'],
    players: '1-4',
    playtime: '60-120m',
    age: '14+',
    image: 'https://picsum.photos/seed/gloomhaven/400/400',
    rating: 8.6,
    weight: 3.8
  },
  {
    id: 'g19',
    title: 'Great Western Trail',
    description: 'Herd cattle from Texas to Kansas City in this strategic masterpiece.',
    category: ['Strategy', 'Western', 'Economic'],
    players: '1-4',
    playtime: '75-150m',
    age: '12+',
    image: 'https://picsum.photos/seed/gwt/400/400',
    rating: 8.2,
    weight: 3.7
  },
  {
    id: 'g8',
    title: 'Heat: Pedal to the Metal',
    description: 'Intense 1960s car racing with hand management and press-your-luck mechanics.',
    category: ['Racing', 'Sports'],
    players: '1-6',
    playtime: '30-60m',
    age: '10+',
    image: 'https://picsum.photos/seed/heat/400/400',
    rating: 8.1,
    weight: 2.2
  },
  {
    id: 'g20',
    title: 'Jaipur',
    description: 'A fast-paced card game of trading for two players.',
    category: ['Card Game', 'Economic'],
    players: '2',
    playtime: '30m',
    age: '12+',
    image: 'https://picsum.photos/seed/jaipur/400/400',
    rating: 7.5,
    weight: 1.48
  },
  {
    id: 'g21',
    title: 'King of Tokyo',
    description: 'Play as mutant monsters, gigantic robots, and strange aliens battling in a fun, chaotic atmosphere.',
    category: ['Dice', 'Fighting', 'Party'],
    players: '2-6',
    playtime: '30m',
    age: '8+',
    image: 'https://picsum.photos/seed/kingoftokyo/400/400',
    rating: 7.1,
    weight: 1.5
  },
  {
    id: 'g22',
    title: 'Lost Ruins of Arnak',
    description: 'Explore an uninhabited island, find lost artifacts, and face fearsome guardians.',
    category: ['Strategy', 'Adventure', 'Exploration'],
    players: '1-4',
    playtime: '30-120m',
    age: '12+',
    image: 'https://picsum.photos/seed/arnak/400/400',
    rating: 8.1,
    weight: 2.9
  },
  {
    id: 'g23',
    title: 'Pandemic',
    description: 'Your team of experts must prevent the world from succumbing to a viral pandemic.',
    category: ['Co-op', 'Strategy', 'Medical'],
    players: '2-4',
    playtime: '45m',
    age: '8+',
    image: 'https://picsum.photos/seed/pandemic/400/400',
    rating: 7.5,
    weight: 2.4
  },
  {
    id: 'g24',
    title: 'Patchwork',
    description: 'A two-player puzzle game about creating the most aesthetic quilt.',
    category: ['Abstract', 'Puzzle'],
    players: '2',
    playtime: '15-30m',
    age: '8+',
    image: 'https://picsum.photos/seed/patchwork/400/400',
    rating: 7.6,
    weight: 1.6
  },
  {
    id: 'g9',
    title: 'Root',
    description: 'A game of woodland might and right where every faction plays by completely different rules.',
    category: ['Wargame', 'Strategy', 'Animals'],
    players: '2-4',
    playtime: '60-90m',
    age: '10+',
    image: 'https://picsum.photos/seed/root/400/400',
    rating: 8.1,
    weight: 3.8
  },
  {
    id: 'g25',
    title: 'Scythe',
    description: 'An engine-building, asymmetric, competitive board game set in an alternate-history 1920s period.',
    category: ['Strategy', 'Sci-Fi', 'Economic'],
    players: '1-5',
    playtime: '90-115m',
    age: '14+',
    image: 'https://picsum.photos/seed/scythe/400/400',
    rating: 8.1,
    weight: 3.4
  },
  {
    id: 'g26',
    title: 'Splendor',
    description: 'A game of chip-collecting and card development.',
    category: ['Strategy', 'Economic', 'Card Game'],
    players: '2-4',
    playtime: '30m',
    age: '10+',
    image: 'https://picsum.photos/seed/splendor/400/400',
    rating: 7.4,
    weight: 1.7
  },
  {
    id: 'g27',
    title: 'Terraforming Mars',
    description: 'Compete to transform Mars into a habitable planet.',
    category: ['Strategy', 'Sci-Fi', 'Economic'],
    players: '1-5',
    playtime: '120m',
    age: '12+',
    image: 'https://picsum.photos/seed/tmars/400/400',
    rating: 8.3,
    weight: 3.2
  },
  {
    id: 'g28',
    title: 'Ticket to Ride',
    description: 'A cross-country train adventure in which players collect and play matching train cards to claim railway routes.',
    category: ['Family', 'Trains', 'Strategy'],
    players: '2-5',
    playtime: '30-60m',
    age: '8+',
    image: 'https://picsum.photos/seed/ttr/400/400',
    rating: 7.4,
    weight: 1.8
  },
  {
    id: 'g29',
    title: 'Viticulture Essential Edition',
    description: 'Create the most prosperous winery in Italy.',
    category: ['Strategy', 'Farming', 'Economic'],
    players: '1-6',
    playtime: '45-90m',
    age: '13+',
    image: 'https://picsum.photos/seed/viticulture/400/400',
    rating: 8.0,
    weight: 2.9
  },
  {
    id: 'g30',
    title: 'War of the Ring: Second Edition',
    description: 'One player takes control of the Free Peoples, the other the Shadow Armies in the war for Middle-earth.',
    category: ['Wargame', 'Fantasy', 'Thematic'],
    players: '2-4',
    playtime: '150-180m',
    age: '13+',
    image: 'https://picsum.photos/seed/wotr/400/400',
    rating: 8.5,
    weight: 4.2
  },
  {
    id: 'g10',
    title: 'Wingspan',
    description: 'A competitive, medium-weight, card-driven, engine-building board game from Stonemaier Games.',
    category: ['Strategy', 'Card Game', 'Animals'],
    players: '1-5',
    playtime: '40-70m',
    age: '10+',
    image: 'https://picsum.photos/seed/wingspan/400/400',
    rating: 8.1,
    weight: 2.45
  },
    {
    id: 'g11',
    title: 'Zombicide',
    description: 'Collaborative game in which players take the role of a survivor – each with unique abilities.',
    category: ['Thematic', 'Zombies', 'Co-op'],
    players: '1-6',
    playtime: '60m',
    age: '14+',
    image: 'https://picsum.photos/seed/zombicide/400/400',
    rating: 7.2,
    weight: 2.5
  }
];

export const MOCK_MARKET: MarketListing[] = [
  {
    id: 'm1',
    gameId: 'g1',
    game: MOCK_GAMES[0], // Agricola
    price: 45.00,
    condition: 'Like New',
    seller: 'FarmBoy99',
    postedDate: '2023-10-25'
  },
  {
    id: 'm2',
    gameId: 'g3',
    game: MOCK_GAMES[5], // Brass (Note: Index shifted due to inserts, but ID lookup is safer in real app. Here relying on array for mock.)
    price: 65.00,
    condition: 'New',
    seller: 'TrainTycoon',
    postedDate: '2023-10-26'
  },
  {
    id: 'm3',
    gameId: 'g4',
    game: MOCK_GAMES[7], // Catan
    price: 25.00,
    condition: 'Good',
    seller: 'HexagonHater',
    postedDate: '2023-10-20'
  },
  {
    id: 'm4',
    gameId: 'g5',
    game: MOCK_GAMES[10], // Dune
    price: 50.00,
    condition: 'Like New',
    seller: 'SpiceMustFlow',
    postedDate: '2023-10-27'
  },
    {
    id: 'm5',
    gameId: 'g10',
    game: MOCK_GAMES[28], // Wingspan
    price: 35.00,
    condition: 'Fair',
    seller: 'BirdWatcher',
    postedDate: '2023-10-22'
  }
];

export const MOCK_EVENTS: GameEvent[] = [
  {
    id: 'e1',
    title: 'Saturday Night Strategy',
    date: 'Oct 28',
    time: '6:00 PM',
    location: 'The Dice Tower Cafe',
    attendees: 12,
    image: 'https://picsum.photos/seed/event1/400/300',
    type: 'Social',
    description: 'Bring your favorite heavy strategy game or join a table. This week we are featuring Brass: Birmingham.'
  },
  {
    id: 'e2',
    title: 'Catan Championship Qualifier',
    date: 'Nov 02',
    time: '11:00 AM',
    location: 'Meeple Manor',
    attendees: 32,
    image: 'https://picsum.photos/seed/event2/400/300',
    type: 'Tournament',
    description: 'Competitive Catan tournament. Entry fee $10. Winner gets a copy of Catan: Seafarers.'
  },
  {
    id: 'e3',
    title: 'Learn to Play: Gloomhaven',
    date: 'Nov 05',
    time: '2:00 PM',
    location: 'Community Center',
    attendees: 4,
    image: 'https://picsum.photos/seed/event3/400/300',
    type: 'Learn-to-Play',
    description: 'Intimidated by the big box? Join us for a guided tutorial scenario. No experience necessary!'
  }
];

export const ALPHABET = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');