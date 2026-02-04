'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CornerBackButton({ topClass = 'top-4', leftClass = 'left-4' }) {
  return (
    <button
      aria-label="Go back"
      onClick={() => (history.length > 1 ? window.history.back() : (window.location.href = '/'))}
      className={`absolute ${topClass} ${leftClass} inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white/90 backdrop-blur text-gray-700 hover:bg-white`}
    >
      <ArrowLeftIcon className="h-5 w-5" />
    </button>
  );
}


