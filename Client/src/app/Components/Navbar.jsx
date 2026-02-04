'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname?.() || '';

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login'; // Or use router.push('/login') if you prefer
  };

  const navItems = [
    { href: '/browse', label: 'Browse Items' },
    { href: '/list-item', label: 'List an Item' },
    { href: '/request-item', label: 'Request Item' },
    { href: '/how-it-works', label: 'How it Works' },
  ];

  const isActive = (href) => {
    if (!href || href.startsWith('#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-100/80 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/assets/ReneEase.png" alt="RentEase Logo" className="h-8 w-auto" />
            <span className="text-xl font-semibold tracking-tight logo-font">RentEase</span>
          </a>

          <ul className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm text-gray-700 font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`px-3 py-1.5 border-b-2 transition-colors ${
                    isActive(item.href)
                      ? 'text-gray-900 border-emerald-500'
                      : 'border-transparent hover:text-gray-900 hover:border-emerald-400'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <a href="/login" className="px-4 py-2 text-sm font-medium rounded-md border hover:bg-gray-50">Log In</a>
                <a href="/signup" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-tr from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95">Sign Up</a>
              </>
            ) : (
              <>
                <a href="/dashboard" className="px-4 py-2 text-sm font-medium rounded-md border hover:bg-gray-50">Dashboard</a>
                <button onClick={handleLogout} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">Logout</button>
              </>
            )}
          </div>

          <button onClick={toggleMenu} className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
          <ul className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <li key={item.href}><a href={item.href} className="block rounded px-2 py-2 hover:bg-gray-50">{item.label}</a></li>
            ))}
            <li className="pt-2 flex items-center gap-3">
          {!isLoggedIn ? (
            <>
                  <a href="/login" className="flex-1 rounded border px-3 py-2 text-center">Log In</a>
                  <a href="/signup" className="flex-1 rounded bg-gradient-to-tr from-emerald-500 to-cyan-500 px-3 py-2 text-center text-white">Sign Up</a>
            </>
          ) : (
            <>
                  <a href="/dashboard" className="w-full rounded border px-3 py-2 text-center mb-2">Dashboard</a>
                  <button onClick={handleLogout} className="w-full rounded bg-red-600 px-3 py-2 text-white">Logout</button>
            </>
              )}
            </li>
            <li><a href="/list-item" className="mt-2 block rounded border px-3 py-2 text-center hover:bg-gray-50">List an Item</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
