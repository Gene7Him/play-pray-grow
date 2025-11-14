"use client";

import { EditableTextArea } from "./EditableTextArea";

export default function SnackList({ snacks = [], editing = false, onChange = () => {} }) {
  const asText = snacks.join("\n");

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">Snacks This Week 🍎</h4>
      {editing ? (
        <EditableTextArea editing={editing} value={asText} onChange={(v) => onChange(v.split("\n").map(s => s.trim()).filter(Boolean))} />
      ) : (
        <ul className="list-disc ml-6 text-sm">
          {snacks.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      )}
    </div>
  );
}
