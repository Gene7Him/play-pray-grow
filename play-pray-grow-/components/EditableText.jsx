"use client";

export function EditableText({ editing, value, onChange, className = "" }) {
  if (!editing) return <div className={className}>{value}</div>;

  return (
    <input
      type="text"
      className={`border p-2 rounded w-full ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
