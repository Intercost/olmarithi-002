'use client' // Added to fix the 'client-only' import error
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 overflow-hidden">
      <Navbar />
      
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        
        {/* CONTINUOUS MOVING HEADER */}
        <div className="w-full overflow-hidden whitespace-nowrap mb-6 py-4 border-y border-emerald-500/10">
          <div className="inline-block animate-marquee-infinite whitespace-nowrap">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase px-4 inline-block">
              OLMA<span className="text-emerald-500">RITHI</span>  OLMA<span className="text-emerald-500">RITHI</span>   OLMA<span className="text-emerald-500">RITHI</span>  OLMA<span className="text-emerald-500">RITHI</span> 
            </h1>
            {/* Doubled the text to ensure a seamless loop gap-free */}
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase px-4 inline-block">
              OLMA<span className="text-emerald-500">RITHI</span>  OLMA<span className="text-emerald-500">RITHI</span>   OLMA<span className="text-emerald-500">RITHI</span>  OLMA<span className="text-emerald-500">RITHI</span>  OLMA<span className="text-emerald-500">RITHI</span>
            </h1>
          </div>
        </div>

        {/* LOGO IMAGE */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 mb-8 transition-all duration-500 hover:scale-105">
          <Image 
            src="/favicon.ico" 
            alt="Olmarithi Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="text-zinc-400 text-lg md:text-xl max-w-xl mb-10">
          Simplicity is Complex.
        </p>
        
        <Link href="/shop" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-emerald-900/20">
          Explore our Shop
        </Link>
      </section>

      {/* STABLE CSS ANIMATION */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </main>
  );
}