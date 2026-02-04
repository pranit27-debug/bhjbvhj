'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import CornerBackButton from '../Components/CornerBackButton';

export default function BrowsePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('recent');
  const [visibleCount, setVisibleCount] = useState(9);
  const [viewMode, setViewMode] = useState('inventory'); // 'inventory' or 'requests'
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      if (query) params.set('search', query);
      
      let endpoint = '';
      if (viewMode === 'inventory') {
        endpoint = `http://localhost:4000/api/inventory/public?${params.toString()}`;
      } else {
        endpoint = `http://localhost:4000/api/req/requests/lender?${params.toString()}`;
      }
      
      const res = await fetch(endpoint, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const json = await res.json();
      const data = json?.data || json?.requests || [];
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error fetching items:', e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, viewMode]);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((it) =>
      [it.itemName, it.itemCategory, it.notes].filter(Boolean).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [items, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === 'recent') return new Date(b.createdAt || b.rentalStart) - new Date(a.createdAt || a.rentalStart);
      if (sort === 'name') return String(a.itemName).localeCompare(String(b.itemName));
      return 0;
    });
  }, [filtered, sort]);

  const visible = sorted.slice(0, visibleCount);

  const categories = ['Furniture', 'Appliances', 'Bikes', 'Tools', 'Electronics', 'Sports'];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {/* Header with Logo */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="/assets/ReneEase.png" alt="RentEase Logo" className="h-12 w-auto" />
          <h1 className="text-4xl font-bold text-gray-900">Browse Items</h1>
        </div>
        <p className="text-gray-600 text-lg">Discover available items and rental requests in your area</p>
        
        {/* View Mode Toggle */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setViewMode('inventory')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'inventory'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Available Items
            </button>
            <button
              onClick={() => setViewMode('requests')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'requests'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Rental Requests
            </button>
          </div>
        </div>
      </div>
      
      {/* Gradient sub-hero */}
      <div className="rounded-3xl bg-gradient-to-tr from-emerald-50 via-cyan-50 to-amber-50 p-6 pl-14 relative">
        <CornerBackButton topClass="top-4" leftClass="left-4" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="pl-12">
            <h2 className="text-2xl font-bold">Search & Filter</h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search items, categories, notes..."
              className="w-full sm:w-72 rounded-md border px-3 py-2"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md border px-3 py-2"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md border px-3 py-2">
              <option value="recent">Sort: Recent</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>
        </div>

        {/* Category chip row */}
        <div className="mt-4 flex flex-wrap gap-3">
          {['All', ...categories].map((c) => {
            const v = c === 'All' ? '' : c;
            const active = v === category;
            const categoryImage = c === 'All' ? null : `/assets/${c}.${c === 'Furniture' || c === 'Electronics' ? 'jpeg' : c === 'Bikes' ? 'png' : 'jpg'}`;
            
            return (
              <button
                key={c}
                onClick={() => setCategory(v)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm border transition-all duration-200 ${
                  active 
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-emerald-300'
                }`}
              >
                {categoryImage && (
                  <img 
                    src={categoryImage} 
                    alt={c} 
                    className={`w-5 h-5 rounded-full object-cover ${active ? 'ring-2 ring-white' : ''}`}
                  />
                )}
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="h-40 rounded-xl skeleton mb-3"></div>
              <div className="h-5 w-1/2 skeleton rounded mb-2"></div>
              <div className="h-4 w-1/3 skeleton rounded"></div>
            </div>
          ))
        )}

        {!loading && sorted.length === 0 && (
          <p className="col-span-full text-gray-600">No items found.</p>
        )}

        {!loading && visible.map((it) => (
          <motion.div
            key={it._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border bg-white p-4 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* image area */}
            <div className="h-40 rounded-xl bg-gray-100 relative overflow-hidden">
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs text-gray-700 border">{it.category}</span>
              <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">Available</span>
            </div>
            <h3 className="mt-3 font-semibold">{viewMode === 'inventory' ? it.title : it.itemName}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {viewMode === 'inventory' ? (it.description || 'No description provided.') : (it.notes || 'No description provided.')}
            </p>
            <div className="mt-3 flex items-center justify-between text-sm">
              {viewMode === 'inventory' ? (
                <span className="text-gray-500">₹{it.rate}/{it.rateType === 'per_hour' ? 'hr' : it.rateType === 'per_week' ? 'week' : 'day'}</span>
              ) : (
                <span className="text-gray-500">
                  {new Date(it.rentalStart).toLocaleDateString()} - {new Date(it.rentalEnd).toLocaleDateString()}
                </span>
              )}
              <div className="flex items-center gap-2">
                <button className="rounded border px-3 py-1">Details</button>
                {viewMode === 'inventory' ? (
                  <a href="/requests" className="rounded bg-emerald-500 px-3 py-1 text-white">Rent Now</a>
                ) : (
                  <a href="/list-item" className="rounded bg-blue-500 px-3 py-1 text-white">Respond</a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!loading && visibleCount < sorted.length && (
        <div className="mt-8 flex justify-center">
          <button onClick={() => setVisibleCount((c) => c + 9)} className="rounded-md border px-4 py-2 hover:bg-gray-50">Load more</button>
        </div>
      )}
    </div>
  );
}


