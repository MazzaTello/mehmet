'use client';


/**
 * Stellar NFT Ticket Collection Platform
 * 
 * NFT ticket koleksiyonu platformu - Etkinlikler, maçlar, konserler için
 * Stellar blockchain üzerinde hızlı ve ucuz NFT minting
 */

import { useState } from 'react';
import { Trophy, Music, Palette, Calendar, MapPin, Users, Grid3x3, List, Plus, ExternalLink, X, Send, Copy, Check, Clock, Hash } from 'lucide-react';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
type Category = 'football' | 'concert' | 'museum' | 'university';

interface NFTTicket {
  id: number;
  title: string;
  category: Category;
  date: string;
  location: string;
  image: string;
  gradient: string;
  attendees: number;
  rarity: Rarity;
}

interface CategoryType {
  id: string;
  name: string;
  icon: any;
  color: string;
}

export default function NFTTicketPlatform() {
  const [publicKey, setPublicKey] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showMintModal, setShowMintModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFTTicket | null>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAddress, setTransferAddress] = useState('');

  // Mock NFT Ticket Data
  const nftTickets: NFTTicket[] = [
    {
      id: 1,
      title: "Galatasaray vs Fenerbahçe",
      category: "football",
      date: "2025-03-15",
      location: "Ali Sami Yen Spor Kompleksi",
      image: "🏟️",
      gradient: "from-yellow-500 to-red-600",
      attendees: 52000,
      rarity: "legendary"
    },
    {
      id: 2,
      title: "İTÜ Teknoloji Zirvesi 2025",
      category: "university",
      date: "2025-02-20",
      location: "İTÜ Süleyman Demirel Kültür Merkezi",
      image: "🎓",
      gradient: "from-blue-500 to-cyan-600",
      attendees: 1500,
      rarity: "rare"
    },
    {
      id: 3,
      title: "Sezen Aksu Konseri",
      category: "concert",
      date: "2025-04-10",
      location: "Volkswagen Arena",
      image: "🎤",
      gradient: "from-purple-500 to-pink-600",
      attendees: 15000,
      rarity: "epic"
    },
    {
      id: 4,
      title: "İstanbul Modern Sanat Sergisi",
      category: "museum",
      date: "2025-01-28",
      location: "İstanbul Modern",
      image: "🎨",
      gradient: "from-green-500 to-teal-600",
      attendees: 850,
      rarity: "common"
    },
    {
      id: 5,
      title: "Rock'n Coke Festival",
      category: "concert",
      date: "2025-06-15",
      location: "Life Park",
      image: "🎸",
      gradient: "from-orange-500 to-red-600",
      attendees: 45000,
      rarity: "legendary"
    },
    {
      id: 6,
      title: "Beşiktaş - Trabzonspor",
      category: "football",
      date: "2025-02-28",
      location: "Vodafone Park",
      image: "⚽",
      gradient: "from-black to-gray-700",
      attendees: 41000,
      rarity: "epic"
    }
  ];

  const categories: CategoryType[] = [
    { id: 'all', name: 'Tümü', icon: Grid3x3, color: 'purple' },
    { id: 'football', name: 'Futbol', icon: Trophy, color: 'yellow' },
    { id: 'concert', name: 'Konser', icon: Music, color: 'pink' },
    { id: 'museum', name: 'Müze & Sergi', icon: Palette, color: 'green' },
    { id: 'university', name: 'Üniversite', icon: Calendar, color: 'blue' }
  ];

  const rarityColors: Record<Rarity, string> = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-600'
  };

  const filteredTickets = selectedCategory === 'all' 
    ? nftTickets 
    : nftTickets.filter(ticket => ticket.category === selectedCategory);

  const handleConnect = () => {
    // Mock connection
    setPublicKey('GDEMOADDRESS123...');
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setPublicKey('');
    setIsConnected(false);
  };

  const handleTransfer = () => {
    if (!transferAddress || !selectedNFT) return;
    
    // Mock transfer transaction
    alert(`NFT #${selectedNFT.id} transfer ediliyor...\nAlıcı: ${transferAddress}\n\nİşlem başarılı! (Demo)`);
    setShowTransferModal(false);
    setTransferAddress('');
    setSelectedNFT(null);
  };

  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  const handleCopyTokenId = (id: number) => {
    navigator.clipboard.writeText(`STELLAR-NFT-${id.toString().padStart(8, '0')}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const stats = {
    total: nftTickets.length,
    legendary: nftTickets.filter(t => t.rarity === 'legendary').length,
    epic: nftTickets.filter(t => t.rarity === 'epic').length,
    rare: nftTickets.filter(t => t.rarity === 'rare').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-purple-500/50">
                🎫
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">NFT Ticket Koleksiyonum</h1>
                <p className="text-white/60 text-sm">Stellar Blockchain • Testnet</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {!isConnected ? (
                <button
                  onClick={handleConnect}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
                >
                  Cüzdan Bağla
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
                    <p className="text-white/60 text-xs">Bağlı Cüzdan</p>
                    <p className="text-white text-sm font-mono">{publicKey.slice(0, 8)}...{publicKey.slice(-6)}</p>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10"
                  >
                    Çıkış
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!isConnected ? (
          // Welcome Screen
          <div className="space-y-8">
            <div className="text-center py-16">
              <div className="text-8xl mb-6 animate-bounce">🎫</div>
              <h2 className="text-5xl font-bold text-white mb-4">
                Etkinlik Anılarını NFT Olarak Sakla
              </h2>
              <p className="text-white/70 text-xl max-w-2xl mx-auto mb-8">
                Katıldığın her etkinlik, maç ve konserin dijital biletini koleksiyonunda tut. 
                Stellar blockchain'de hızlı, ucuz ve güvenli!
              </p>
              <button
                onClick={handleConnect}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-lg rounded-2xl font-bold transition-all shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
              >
                Hemen Başla →
              </button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-white font-bold text-xl mb-2">Anında Mint</h3>
                <p className="text-white/60">Stellar'ın hızlı blockchain'i sayesinde saniyeler içinde NFT mint et</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-pink-500/50 transition-all">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-white font-bold text-xl mb-2">Düşük Maliyet</h3>
                <p className="text-white/60">0.00001 XLM ile NFT oluştur, neredeyse sıfır işlem ücreti</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-white font-bold text-xl mb-2">Zengin Metadata</h3>
                <p className="text-white/60">Etkinlik detayları, lokasyon, tarih ve daha fazlasını sakla</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-green-500/50 transition-all">
                <div className="text-5xl mb-4">🔄</div>
                <h3 className="text-white font-bold text-xl mb-2">Kolay Transfer</h3>
                <p className="text-white/60">NFT'lerini dilediğin gibi transfer et veya paylaş</p>
              </div>
            </div>

            {/* Use Cases */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gradient-to-br from-yellow-500/10 to-red-600/10 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/20">
                <Trophy className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-3">Futbol Kulüpleri</h3>
                <p className="text-white/70 mb-4">Maç katılım rozetleri, sezon bileti NFT'leri, özel maç anıları</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">Derbi</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">Şampiyonluk</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20">
                <Calendar className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-3">Üniversiteler</h3>
                <p className="text-white/70 mb-4">Etkinlik hatıra NFT'leri, mezuniyet töreni, seminer katılım belgeleri</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Mezuniyet</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">Seminer</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-teal-600/10 backdrop-blur-xl rounded-2xl p-8 border border-green-500/20">
                <Palette className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-white font-bold text-xl mb-3">Müze & Sanat</h3>
                <p className="text-white/70 mb-4">Dijital müze bileti, sergi katılım NFT'si, özel koleksiyonlar</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Sergi</span>
                  <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs">Müze</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Dashboard
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
                <p className="text-purple-300 text-sm mb-1">Toplam NFT</p>
                <p className="text-white text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30">
                <p className="text-yellow-300 text-sm mb-1">Legendary</p>
                <p className="text-white text-3xl font-bold">{stats.legendary}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-400/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/30">
                <p className="text-purple-300 text-sm mb-1">Epic</p>
                <p className="text-white text-3xl font-bold">{stats.epic}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-400/20 to-blue-600/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-400/30">
                <p className="text-blue-300 text-sm mb-1">Rare</p>
                <p className="text-white text-3xl font-bold">{stats.rare}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                        selectedCategory === cat.id
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMintModal(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Yeni NFT Mint
                </button>
                
                <div className="flex bg-white/5 rounded-xl border border-white/10 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* NFT Collection */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredTickets.map(ticket => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedNFT(ticket)}
                  className={`bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all hover:scale-105 overflow-hidden group cursor-pointer ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`bg-gradient-to-br ${ticket.gradient} ${viewMode === 'grid' ? 'h-48' : 'w-48 h-full'} flex items-center justify-center text-6xl relative`}>
                    {ticket.image}
                    <div className={`absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-lg rounded-full text-xs text-white font-bold border border-white/20`}>
                      <span className={`inline-block w-2 h-2 rounded-full mr-1 bg-gradient-to-r ${rarityColors[ticket.rarity]}`}></span>
                      {ticket.rarity.toUpperCase()}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-white text-sm font-semibold">
                          Detayları Gör
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-white font-bold text-xl mb-2">{ticket.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(ticket.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <MapPin className="w-4 h-4" />
                        {ticket.location}
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Users className="w-4 h-4" />
                        {ticket.attendees.toLocaleString()} katılımcı
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-white/40 text-xs">Token ID: #{ticket.id.toString().padStart(4, '0')}</span>
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors flex items-center gap-1 text-sm">
                        Detaylar
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTickets.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎫</div>
                <p className="text-white/60 text-lg">Bu kategoride henüz NFT bulunmuyor</p>
              </div>
            )}
          </div>
        )}

        {/* Mint Modal */}
        {showMintModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowMintModal(false)}>
            <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full border border-white/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Yeni NFT Ticket Mint Et</h3>
                <button onClick={() => setShowMintModal(false)} className="text-white/60 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Etkinlik Adı</label>
                  <input
                    type="text"
                    placeholder="Örn: Galatasaray vs Fenerbahçe"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Kategori</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500">
                    <option>Futbol Maçı</option>
                    <option>Konser</option>
                    <option>Müze/Sergi</option>
                    <option>Üniversite Etkinliği</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Tarih</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Saat</label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Lokasyon</label>
                  <input
                    type="text"
                    placeholder="Örn: Vodafone Park"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                <p className="text-white/60 text-sm">💡 Mint maliyeti: ~0.00001 XLM</p>
                <p className="text-white/60 text-sm">⚡ İşlem süresi: ~3-5 saniye</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowMintModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    alert('NFT Mint işlemi başlatıldı! (Demo)');
                    setShowMintModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg"
                >
                  Mint Et 🎫
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NFT Detail Modal */}
        {selectedNFT && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedNFT(null)}>
            <div className="bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full border border-white/20 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-2xl font-bold text-white">NFT Ticket Detayları</h3>
                <button onClick={() => setSelectedNFT(null)} className="text-white/60 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* NFT Image */}
                  <div className={`bg-gradient-to-br ${selectedNFT.gradient} rounded-2xl h-64 flex items-center justify-center text-8xl relative`}>
                    {selectedNFT.image}
                    <div className="absolute top-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-lg rounded-full text-sm text-white font-bold border border-white/20">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${rarityColors[selectedNFT.rarity]}`}></span>
                      {selectedNFT.rarity.toUpperCase()}
                    </div>
                  </div>

                  {/* NFT Info */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">{selectedNFT.title}</h4>
                      <p className="text-white/60">Etkinlik Hatıra NFT'si</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-white/80">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white/50 text-xs">Tarih</p>
                          <p>{new Date(selectedNFT.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-white/80">
                        <MapPin className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white/50 text-xs">Lokasyon</p>
                          <p>{selectedNFT.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-white/80">
                        <Users className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white/50 text-xs">Katılımcı Sayısı</p>
                          <p>{selectedNFT.attendees.toLocaleString()} kişi</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-white/80">
                        <Hash className="w-5 h-5 text-purple-400" />
                        <div className="flex-1">
                          <p className="text-white/50 text-xs">Token ID</p>
                          <div className="flex items-center gap-2">
                            <p className="font-mono">STELLAR-NFT-{selectedNFT.id.toString().padStart(8, '0')}</p>
                            <button
                              onClick={() => handleCopyTokenId(selectedNFT.id)}
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              {copiedId === selectedNFT.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    Blockchain Metadata
                  </h5>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-white/50">Network</p>
                      <p className="text-white">Stellar Testnet</p>
                    </div>
                    <div>
                      <p className="text-white/50">Mint Date</p>
                      <p className="text-white">22 Kasım 2025</p>
                    </div>
                    <div>
                      <p className="text-white/50">Owner</p>
                      <p className="text-white font-mono text-xs">{publicKey.slice(0, 12)}...{publicKey.slice(-8)}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Category</p>
                      <p className="text-white capitalize">{selectedNFT.category}</p>
                    </div>
                  </div>
                </div>

                {/* Transaction History */}
                <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
                  <h5 className="text-white font-semibold mb-3">İşlem Geçmişi</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white/80">Mint İşlemi</span>
                      </div>
                      <span className="text-white/50">22 Kas 2025, 14:30</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-white/80">Metadata Güncellendi</span>
                      </div>
                      <span className="text-white/50">22 Kas 2025, 14:31</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-white/10 flex gap-3">
                <button
                  onClick={() => {
                    setShowTransferModal(true);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Transfer Et
                </button>
                <button
                  onClick={() => window.open(`https://stellar.expert/explorer/testnet/asset/NFT-${selectedNFT.id}`, '_blank')}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Stellar Explorer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transfer Modal */}
        {showTransferModal && selectedNFT && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[60]" onClick={() => setShowTransferModal(false)}>
            <div className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">NFT Transfer</h3>
                <button onClick={() => setShowTransferModal(false)} className="text-white/60 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <div className={`bg-gradient-to-br ${selectedNFT.gradient} rounded-xl h-32 flex items-center justify-center text-5xl mb-4`}>
                  {selectedNFT.image}
                </div>
                <h4 className="text-white font-bold text-center">{selectedNFT.title}</h4>
                <p className="text-white/60 text-sm text-center">Token #{selectedNFT.id.toString().padStart(4, '0')}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Alıcı Stellar Adresi</label>
                  <input
                    type="text"
                    value={transferAddress}
                    onChange={(e) => setTransferAddress(e.target.value)}
                    placeholder="GXXX...XXXX"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500 font-mono text-sm"
                  />
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <p className="text-yellow-300 text-sm">⚠️ Transfer işlemi geri alınamaz!</p>
                  <p className="text-yellow-200/60 text-xs mt-1">Alıcı adresini dikkatli kontrol edin.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Transfer Ücreti</span>
                    <span className="text-white">0.00001 XLM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">İşlem Süresi</span>
                    <span className="text-white">~3-5 saniye</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
                >
                  İptal
                </button>
                <button
                  onClick={handleTransfer}
                  disabled={!transferAddress}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Transfer
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-white/40 text-sm mb-2">
              Stellar Blockchain ile Güçlendirilmiştir • Testnet
            </p>
            <p className="text-white/30 text-xs">
              ⚠️ Bu bir demo uygulamadır. Gerçek fonlar kullanmayın.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}