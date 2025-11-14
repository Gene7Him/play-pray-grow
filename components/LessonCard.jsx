"use client";

import { useState } from "react";
import { EditableText } from "./EditableText";
import { EditableTextArea } from "./EditableTextArea";

export default function LessonCard({ lesson, editing = false, onUpdate = () => {} }) {
  const [local, setLocal] = useState(lesson);

  // Keep parent in sync when editing changes
  function setField(field, value) {
    const updated = { ...local, [field]: value };
    setLocal(updated);
    onUpdate(updated);
  }

  function updateSubject(subj, text) {
    const nextSubjects = { ...local.subjects, [subj]: text.split("\n").map(s => s.trim()).filter(Boolean) };
    setField("subjects", nextSubjects);
  }

  return (
    <div className="card">
      <EditableText editing={editing} value={local.title} onChange={(v) => setField("title", v)} className="text-xl font-bold" />
      <EditableText editing={editing} value={local.focus} onChange={(v) => setField("focus", v)} className="italic text-slate-600" />

      <div className="mt-4 space-y-3">
        {Object.entries(local.subjects).map(([subj, tasks]) => (
          <div key={subj} className="border-t pt-3">
            <h5 className="font-semibold">{subj}</h5>
            {editing ? (
              <EditableTextArea editing={editing} value={tasks.join("\n")} onChange={(v) => updateSubject(subj, v)} />
            ) : (
              <ul className="list-disc ml-6 text-sm">
                {tasks.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h5 className="font-semibold">Supplies</h5>
        {editing ? (
          <EditableTextArea editing={editing} value={local.supplies.join("\n")} onChange={(v) => setField("supplies", v.split("\n").map(s => s.trim()).filter(Boolean))} />
        ) : (
          <ul className="list-disc ml-6 text-sm">
            {local.supplies.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        )}
      </div>

      <div className="mt-3">
        <h5 className="font-semibold">Reflection Questions</h5>
        {editing ? (
          <EditableTextArea editing={editing} value={(local.reflection_questions || []).join("\n")} onChange={(v) => setField("reflection_questions", v.split("\n").map(s => s.trim()).filter(Boolean))} />
        ) : (
          <ul className="list-disc ml-6 text-sm">
            {(local.reflection_questions || []).map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
