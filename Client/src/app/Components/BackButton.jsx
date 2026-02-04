'use client';

export default function BackButton({ className = '', label = 'Back' }) {
  return (
    <button
      onClick={() => (history.length > 1 ? window.history.back() : (window.location.href = '/'))}
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 ${className}`}
    >
      ← {label}
    </button>
  );
}


