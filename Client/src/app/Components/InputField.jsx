'use client';

export default function InputField({ label, icon, type = 'text', className = '', inputProps = {}, ...props }) {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {label && (
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          {icon}
          {label}
        </label>
      )}
      <div className="rounded-2xl border-2 border-cyan-200 bg-white px-4 py-3 focus-within:border-cyan-400">
        <input
          type={type}
          className="w-full outline-none placeholder:text-gray-400"
          {...inputProps}
        />
      </div>
    </div>
  );
}


