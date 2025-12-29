'use client'
import { useCart } from '@/context/CartContext';

export function BagCard({ bag }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
      <img src={bag.image_url} className="w-full h-48 object-cover rounded-xl mb-4" />
      <h3 className="font-bold text-lg">{bag.name}</h3>
      <p className="text-emerald-500 font-bold mb-4">KES {bag.price}</p>
      <button 
        onClick={() => addToCart(bag)}
        className="w-full bg-zinc-800 hover:bg-emerald-600 py-2 rounded-lg transition font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
}