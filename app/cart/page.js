'use client'
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 italic">Your Shopping Bag</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 mb-6">Your bag is currently empty.</p>
            <Link href="/shop" className="bg-emerald-600 px-8 py-3 rounded-full font-bold">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row justify-between items-center bg-zinc-900 p-4 rounded-2xl border border-zinc-800 gap-4">
                <div className="flex gap-4 items-center w-full">
                  <img src={item.image_url} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <p className="font-bold text-lg">{item.name}</p>
                    <p className="text-emerald-500 font-medium">KES {item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-zinc-700 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-zinc-800 text-xl"
                    >-</button>
                    <span className="px-4 font-bold">{item.quantity || 1}</span>
                    <button 
                      onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                      className="px-3 py-1 hover:bg-zinc-800 text-xl"
                    >+</button>
                  </div>
                  
                  <button onClick={() => removeFromCart(index)} className="text-red-500 text-sm hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-10 p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl">
              <div className="flex justify-between text-2xl font-bold mb-8">
                <span>Total Amount</span>
                <span className="text-emerald-500">KES {cartTotal}</span>
              </div>
              
              <Link 
                href="/checkout" 
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-4 rounded-2xl font-bold text-lg transition shadow-lg shadow-emerald-900/20"
              >
                Proceed to Checkout
              </Link>
              
              <Link href="/shop" className="block text-center mt-4 text-zinc-500 hover:text-white text-sm">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}