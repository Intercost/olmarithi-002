'use client'
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 italic">Payment Received!</h1>
        <p className="text-zinc-400 text-lg mb-10">
          Thank you for shopping with <span className="text-emerald-500 font-bold">OLMARITHI</span>. 
          Your order is being processed and will be delivered soon.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl mb-10">
            <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4 font-bold text-center">Join our community</p>
            
            {/* FIXED: Added flex-col for mobile and sm:flex-row for larger screens */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-xl">
                <a href="https://tiktok.com/@olmarithi" target="_blank" className="hover:text-emerald-500 transition px-4 py-2 bg-zinc-800 rounded-xl w-full sm:w-auto text-center">TikTok</a>
                <a href="https://www.instagram.com/olmarithi?igsh=cG5jZjBjc2FvZmJm" target="_blank" className="hover:text-emerald-500 transition px-4 py-2 bg-zinc-800 rounded-xl w-full sm:w-auto text-center">Instagram</a>
                <a href="https://pin.it/m1nWAoKXZ" target="_blank" className="hover:text-emerald-500 transition px-4 py-2 bg-zinc-800 rounded-xl w-full sm:w-auto text-center">Pinterest</a>
            </div>
            
            <p className="mt-6 text-zinc-500 text-sm text-center font-medium">@olmarithi</p>
        </div>

        <Link href="/" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full font-bold transition">
          Back to Home
        </Link>
      </div>
    </main>
  );
}