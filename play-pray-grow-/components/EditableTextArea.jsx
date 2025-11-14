"use client";

export function EditableTextArea({ editing, value, onChange }) {
  if (!editing) return <div className="whitespace-pre-wrap">{value}</div>;

  return (
    <textarea
      rows={4}
      className="border p-2 rounded w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
