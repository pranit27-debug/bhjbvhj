'use client';

export default function GradientButton({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-amber-600 px-5 py-3 font-semibold text-white shadow hover:opacity-95 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}


