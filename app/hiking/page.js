import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function HikingPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/hero-hike.jpg" 
          alt="Hiking Hero" 
          fill 
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-10">
            {/* Responsive Font Scaling:
                - text-4xl: Extra small mobile
                - sm:text-6xl: Large mobile/Tablets
                - lg:text-9xl: Large Desktop screens 
            */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter italic text-emerald-500 mb-4 leading-none uppercase">
                OLMARITHI <br className="block md:hidden" /> EXPERIENCE
            </h1>
            
            {/* Responsive Paragraph Scaling:
                - text-lg: Mobile
                - md:text-2xl: Desktop
                - max-w-lg to max-w-3xl: Limits width to keep text centered and readable
            */}
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-lg md:max-w-3xl mx-auto font-light leading-relaxed px-2">
                Reset. Reconnect. Return Stronger.
            </p>
        </div>

        </section>

      {/* MISSION STATEMENT SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="space-y-8">
          <p className="text-zinc-400 text-lg leading-relaxed md:text-xl">
            Today’s work culture demands constant performance, yet offers little space for people to pause, reset, and reconnect. 
            Over time, this leads to burnout, disengagement, and weakened team connection.
          </p>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Olmarithi Hike exists to change that.
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed md:text-xl">
            We design and facilitate intentional hiking experiences that help individuals and teams step away from routine, 
            reconnect with themselves, and build stronger human connections through movement and nature.
          </p>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-3xl">
            <p className="text-emerald-500 text-lg md:text-xl font-medium italic">
              "Olmarithi Hike is not a break from work — it’s an investment in people."
            </p>
          </div>
        </div>
      </section>

      {/* IMAGE SHOWCASE GRID */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <div className="relative h-[400px] rounded-3xl overflow-hidden border border-zinc-800">
          <Image src="/bag-action.jpg" alt="Gear in action" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
            Movement
          </div>
        </div>
        <div className="relative h-[400px] rounded-3xl overflow-hidden border border-zinc-800">
          <Image src="/community.jpg" alt="Community hike" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
            Connection
          </div>
        </div>
        <div className="relative h-[400px] md:col-span-2 rounded-3xl overflow-hidden border border-zinc-800">
          <Image src="/trail-path.jpg" alt="The journey" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
            The Journey
          </div>
        </div>
      </section>

      {/* FINAL LOGISTICS SECTION */}
      <section className="max-w-4xl mx-auto px-6 text-center border-t border-zinc-800 pt-20">
        <p className="text-zinc-300 text-xl mb-10">
          By handling planning, logistics, and facilitation, we create seamless outdoor experiences 
          that restore mental clarity, strengthen collaboration, and leave participants refreshed and re-energized.
        </p>
        
        {/* CHANGE THIS PART IN app/hiking/page.js */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
        <a 
            href="https://wa.me/254115246344?text=Hello%20Olmarithi%21%20I%20would%20like%20to%20book%20a%20team%20hiking%20experience." 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-full font-bold text-lg transition shadow-xl shadow-emerald-900/20 text-center"
        >
            Book a Team Experience
        </a>
        <Link href="/shop" className="border border-zinc-700 hover:bg-zinc-800 text-white px-10 py-5 rounded-full font-bold text-lg transition text-center">
            Explore Gear
        </Link>
        </div>
      </section>
    </main>
  );
}