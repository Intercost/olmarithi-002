'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await supabase.from('events').select('*').eq('is_active', true).single();
      if (data) setEvent(data);
    };
    fetchEvent();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* ANIMATED LOGO BUTTON */}
        <Link href="/" className="group relative flex items-center gap-1 overflow-hidden">
          <span className="text-2xl font-bold text-emerald-500 tracking-tighter transition-all duration-300 group-hover:scale-105 group-active:scale-95">
            OLMARITHI
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center text-zinc-400 font-medium">
          <Link href="/shop" className="hover:text-emerald-500 transition-colors">Shop</Link>
          <Link href="/hiking" className="hover:text-emerald-500 transition-colors">Hiking</Link>
          
          <div className="relative">
            <button onClick={() => setShowEventDropdown(!showEventDropdown)} className="hover:text-emerald-500 transition-colors">
              Events
            </button>
            {showEventDropdown && event && (
              <div className="absolute top-10 right-0 w-64 bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-2">
                <p className="text-white font-bold text-sm">{event.title}</p>
                <p className="text-zinc-400 text-xs mt-1">{event.content}</p>
              </div>
            )}
          </div>

          <Link href="/admin" className="text-xs hover:text-white transition-colors">Admin</Link>

          <Link href="/cart" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all hover:shadow-lg hover:shadow-emerald-900/30">
            Cart ({cart.length})
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-zinc-400 text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 pb-6 border-t border-zinc-800 pt-4 animate-in slide-in-from-top-4">
          <Link href="/shop" className="block text-zinc-400" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link href="/hiking" className="block text-zinc-400" onClick={() => setIsMenuOpen(false)}>Olmarithi Experience</Link>
          
          <div className="py-2">
            <p className="text-emerald-500 font-bold text-sm">Latest Event:</p>
            {event ? (
              <p className="text-zinc-400 text-sm mt-1">{event.title} - {event.content}</p>
            ) : (
              <p className="text-zinc-500 text-sm">No active events</p>
            )}
          </div>
          <Link href="/admin" className="block text-zinc-400" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
          <Link href="/cart" className="block bg-emerald-600 text-center py-3 rounded-xl font-bold text-white">
            View Cart ({cart.length})
          </Link>
        </div>
      )}
    </nav>
  );
}