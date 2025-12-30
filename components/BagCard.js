'use client'
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Maximize2, X } from 'lucide-react';

export function BagCard({ bag }) {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 group transition-all hover:border-emerald-500/50">
        <div 
          className="relative h-72 cursor-zoom-in overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <Image 
            src={bag.image_url} 
            alt={bag.name} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize2 className="text-white w-8 h-8" />
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{bag.name}</h3>
          <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{bag.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-emerald-500 font-black text-lg text-nowrap">Ksh {bag.price}</span>
            <button 
              onClick={() => addToCart(bag)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          <button className="absolute top-6 right-6 text-white hover:text-emerald-500"><X size={40} /></button>
          <div className="relative w-full h-[80vh] max-w-5xl">
            <Image src={bag.image_url} alt={bag.name} fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
