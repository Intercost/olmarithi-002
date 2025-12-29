import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { BagCard } from '@/components/BagCard';

export default async function ShopPage() {
  const { data: bags } = await supabase.from('bags').select('*');

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Our <span className="text-emerald-500">Collection</span></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bags?.map((bag) => (
            <BagCard key={bag.id} bag={bag} />
          ))}
        </div>
      </div>
    </main>
  );
}