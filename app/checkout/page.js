'use client'
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  
  // FIXED: Added the loading state here
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    deliveryType: 'pickup'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Now this will work!

      try {
      // 1. Save order to Supabase first
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: formData.fullName,
          phone: formData.phone,
          amount: cartTotal,
          items: cart, // The list of bags from your CartContext
          status: 'pending',
          delivery_location: formData.location
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Trigger M-Pesa STK Push
      const response = await fetch('/api/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: `254${formData.phone}`,
          amount: cartTotal,
          orderId: order.id // Pass the order ID so the callback knows which one to update
        })
      });

      const result = await response.json();
      
      if (result.ResponseCode === "0") {
        alert("Check your phone for the M-Pesa prompt!");
        // We can redirect to success page after a delay or keep them here
        window.location.href = '/success'; 
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
    
    try {
      // We format the phone to include the 254 prefix Safaricom needs
      const formattedPhone = `254${formData.phone}`;

      const response = await fetch('/api/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formattedPhone,
          amount: cartTotal
        })
      });

      const result = await response.json();
      console.log("M-Pesa Response:", result);
      
      if (result.ResponseCode === "0") {
        alert("Please check your phone to enter your M-Pesa PIN");
      } else {
        alert("M-Pesa Error: " + (result.errorMessage || result.CustomerMessage || "Invalid Credentials"));
      }
    } catch (error) {
      alert("Payment Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2 italic">Delivery Details</h1>
        <p className="text-zinc-500 mb-8">Please enter your info for the order.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <input 
              type="text" placeholder="Full Name" required
              className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-emerald-500"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
            
            <div className="flex gap-4">
              <span className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 text-zinc-400 flex items-center">+254</span>
              <input 
                type="number" 
                placeholder="712345678" 
                required
                className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-emerald-500"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <input 
              type="email" placeholder="Email Address" required
              className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-emerald-500"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />

            <select 
              className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none"
              onChange={(e) => setFormData({...formData, deliveryType: e.target.value})}
            >
              <option value="pickup">Pick up (Nairobi CBD)</option>
              <option value="delivery">Doorstep Delivery</option>
              <option value="outside">Outside Nairobi</option>
            </select>

            <textarea 
              placeholder="Detailed Location / Building / House Number" required
              className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl h-32 outline-none focus:border-emerald-500"
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="border-t border-zinc-800 pt-6 mt-6">
            <div className="flex justify-between mb-6">
              <span className="text-zinc-400">Total to Pay:</span>
              <span className="text-2xl font-bold text-emerald-500">KES {cartTotal}</span>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition ${
                loading ? 'bg-zinc-700 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/20'
              }`}
            >
              {loading ? "Processing..." : "Pay via M-Pesa"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}