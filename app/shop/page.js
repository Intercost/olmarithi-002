'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { BagCard } from '@/components/BagCard';
import { Search } from 'lucide-react';

export default function ShopPage() {
  const [bags, setBags] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBags() {
      const { data } = await supabase
        .from('bags')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setBags(data);
      setLoading(false);
    }
    fetchBags();
  }, []);

  const filteredBags = bags.filter(bag => 
    bag.name.toLowerCase().includes(filter.toLowerCase()) ||
    (bag.description && bag.description.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-4xl font-bold">
            Our <span className="text-emerald-500">Collection</span>
          </h1>
          
          {/* THE FILTER ICON & INPUT BOX */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input 
              type="text"
              placeholder="Search (e.g. Tote, Leather, Hiking...)"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBags.map((bag) => (
              <BagCard key={bag.id} bag={bag} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
