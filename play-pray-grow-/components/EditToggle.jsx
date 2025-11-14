"use client";
import { useState } from "react";

export default function EditToggle({ onToggle }) {
  const [editing, setEditing] = useState(false);

  function toggle() {
    const next = !editing;
    setEditing(next);
    onToggle(next);
  }

  return (
    <button onClick={toggle} className="px-3 py-2 rounded-md bg-sky/60 text-slate-800 font-medium">
      {editing ? "Exit Edit Mode" : "Edit Mode"}
    </button>
  );
}
