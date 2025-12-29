'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [bags, setBags] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [orders, setOrders] = useState([]);

  // Edit State
  const [editingBag, setEditingBag] = useState(null);
  
  // Forms State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bagName, setBagName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventContent, setEventContent] = useState('');

  // Fetch all data function
  const fetchData = async () => {
    const { data: bagsData } = await supabase.from('bags').select('*').order('created_at', { ascending: false });
    const { data: eventsData } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    
    setBags(bagsData || []);
    setAllEvents(eventsData || []);
    setOrders(ordersData || []);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) fetchData(); 
    };
    checkUser();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Login failed: " + error.message);
    else window.location.reload();
    setLoading(false);
  };

  const handleBagSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = editingBag ? editingBag.image_url : '';
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('bag-images').upload(fileName, imageFile);
        if (uploadError) throw uploadError;
        const { data: publicUrl } = supabase.storage.from('bag-images').getPublicUrl(fileName);
        imageUrl = publicUrl.publicUrl;
      }

      const bagData = { name: bagName, price: parseFloat(price), description: desc, image_url: imageUrl };
      if (editingBag) {
        const { error } = await supabase.from('bags').update(bagData).eq('id', editingBag.id);
        if (error) throw error;
        alert("Bag updated!");
      } else {
        const { error } = await supabase.from('bags').insert([bagData]);
        if (error) throw error;
        alert("Bag added!");
      }
      setBagName(''); setPrice(''); setDesc(''); setImageFile(null); setEditingBag(null);
      fetchData();
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  const handleEditClick = (bag) => {
    setEditingBag(bag);
    setBagName(bag.name);
    setPrice(bag.price);
    setDesc(bag.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from('events').update({ is_active: false }).eq('is_active', true);
      const { error } = await supabase.from('events').insert([{ title: eventTitle, content: eventContent, is_active: true }]);
      if (error) throw error;
      alert("Event banner updated!");
      setEventTitle(''); setEventContent('');
      fetchData(); 
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  const handleDeleteBag = async (id) => {
    if(confirm("Delete this bag?")) {
      const { error } = await supabase.from('bags').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchData(); 
    }
  };

  const handleDeleteOrder = async (id) => {
    if (confirm("Are you sure you want to permanently delete this order record?")) {
      try {
        const { error } = await supabase.from('orders').delete().eq('id', id);
        if (error) throw error;
        fetchData(); 
        alert("Order deleted successfully");
      } catch (error) { alert("Error deleting order: " + error.message); }
    }
  };

  const handleDeleteEvent = async (id) => {
    if(confirm("Delete this event?")) {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchData();
    }
  };

  if (!user || user.email !== 'olmarithi@gmail.com') {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 text-white">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-4">
          <h1 className="text-2xl font-bold text-emerald-500 text-center">Olmarithi Admin</h1>
          <input type="email" placeholder="Email" required className="w-full bg-zinc-800 p-3 rounded-lg outline-none text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full bg-zinc-800 p-3 rounded-lg outline-none text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-emerald-600 py-3 rounded-lg font-bold hover:bg-emerald-700 transition">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-emerald-500 italic">Admin Dashboard</h1>
          <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-zinc-500 underline">Logout</button>
        </div>

        {/* RECENT ORDERS TABLE - Expanded for Location and Description */}
        <div className="mb-16 bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl">
          <div className="p-6 bg-zinc-800/50 font-bold border-b border-zinc-700 text-emerald-500 flex justify-between items-center">
            <span>Recent Customer Orders</span>
            <span className="text-xs text-zinc-500 font-normal">Total: {orders.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-zinc-500 text-xs border-b border-zinc-800 uppercase tracking-widest">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Delivery Location</th>
                  <th className="p-4">Order Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="p-4 align-top">
                      <p className="font-bold text-zinc-100">{order.customer_name}</p>
                      <p className="text-zinc-500 text-xs">{order.phone}</p>
                    </td>
                    <td className="p-4 align-top text-zinc-400 max-w-[200px]">
                      <p className="break-words">{order.delivery_location || "Not provided"}</p>
                    </td>
                    <td className="p-4 align-top">
                      <div className="space-y-1">
                        {Array.isArray(order.items) ? (
                          order.items.map((item, idx) => (
                            <div key={idx} className="text-xs bg-zinc-800 px-2 py-1 rounded border border-zinc-700 inline-block mr-1">
                              {item.name} (x{item.quantity || 1})
                            </div>
                          ))
                        ) : (
                          <span className="text-zinc-500 italic">1 item</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-top font-bold text-emerald-500">KES {order.amount}</td>
                    <td className="p-4 align-top">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'paid' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                      }`}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-4 align-top">
                      <button onClick={() => handleDeleteOrder(order.id)} className="text-red-500 hover:text-red-400 font-medium text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOTTOM GRID: ADD/EDIT FORMS AND MANAGEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-zinc-800 pt-12">
          <div className="space-y-12">
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 relative shadow-xl">
              {editingBag && (
                <button onClick={() => { setEditingBag(null); setBagName(''); setPrice(''); setDesc(''); }} className="absolute top-6 right-8 text-xs text-zinc-500 underline">Cancel Edit</button>
              )}
              <h2 className="text-2xl font-bold mb-6 italic">{editingBag ? 'Update Bag' : 'Add New Bag'}</h2>
              <form onSubmit={handleBagSubmit} className="space-y-4">
                <input type="text" placeholder="Bag Name" required className="w-full bg-zinc-800 p-4 rounded-xl outline-none text-white focus:border-emerald-500 border border-transparent" value={bagName} onChange={(e) => setBagName(e.target.value)} />
                <input type="number" placeholder="Price" required className="w-full bg-zinc-800 p-4 rounded-xl outline-none text-white focus:border-emerald-500 border border-transparent" value={price} onChange={(e) => setPrice(e.target.value)} />
                <textarea placeholder="Description" required className="w-full bg-zinc-800 p-4 rounded-xl h-32 outline-none text-white focus:border-emerald-500 border border-transparent" value={desc} onChange={(e) => setDesc(e.target.value)} />
                <div className="bg-zinc-800 p-4 rounded-xl border border-dashed border-zinc-700">
                  <p className="text-xs text-zinc-500 mb-2 font-bold">Product Image {editingBag && "(Keep empty to use current)"}</p>
                  <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="text-sm text-zinc-400" />
                </div>
                <button className="w-full bg-emerald-600 py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-900/20">
                  {editingBag ? 'Save Changes' : 'Publish Product'}
                </button>
              </form>
            </div>
            
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 italic">Post New Event Banner</h2>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <input type="text" placeholder="Event Title" required className="w-full bg-zinc-800 p-4 rounded-xl outline-none text-white focus:border-emerald-500 border border-transparent" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                <textarea placeholder="Event Details" required className="w-full bg-zinc-800 p-4 rounded-xl h-24 outline-none text-white focus:border-emerald-500 border border-transparent" value={eventContent} onChange={(e) => setEventContent(e.target.value)} />
                <button className="w-full border border-emerald-600 text-emerald-500 py-4 rounded-xl font-bold hover:bg-emerald-500/10 transition">Update Event Banner</button>
              </form>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl">
              <div className="p-6 bg-zinc-800/50 font-bold border-b border-zinc-800 uppercase text-xs tracking-widest text-zinc-400">Inventory Management</div>
              <div className="divide-y divide-zinc-800 max-h-[600px] overflow-y-auto">
                {bags.map(bag => (
                  <div key={bag.id} className="p-4 flex justify-between items-center group hover:bg-zinc-800/10">
                    <div className="flex items-center gap-4">
                      <img src={bag.image_url} className="w-14 h-14 object-cover rounded-xl border border-zinc-700" alt="" />
                      <div>
                        <p className="text-sm font-bold text-zinc-100">{bag.name}</p>
                        <p className="text-xs text-emerald-500 font-bold">KES {bag.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => handleEditClick(bag)} className="text-blue-500 text-xs font-bold hover:underline">Edit</button>
                      <button onClick={() => handleDeleteBag(bag.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-xl">
              <div className="p-6 bg-zinc-800/50 font-bold border-b border-zinc-800 uppercase text-xs tracking-widest text-zinc-400">Manage Events</div>
              <div className="divide-y divide-zinc-800">
                {allEvents.map(ev => (
                  <div key={ev.id} className="p-6 flex justify-between items-center text-sm">
                    <span className="font-medium text-zinc-300">{ev.title} {ev.is_active && <span className="ml-2 text-[10px] text-emerald-500 font-bold uppercase border border-emerald-500/30 px-2 py-0.5 rounded-full bg-emerald-500/10">Active</span>}</span>
                    <button onClick={() => handleDeleteEvent(ev.id)} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}