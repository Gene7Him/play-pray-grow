"use client";

import { useEffect, useState } from "react";
import EditToggle from "../../../components/EditToggle";
import LessonCard from "../../../components/LessonCard";
import SnackList from "../../../components/SnackList";
import { EditableTextArea } from "../../../components/EditableTextArea";
import { EditableText } from "../../../components/EditableText";

export default function WeekDetail({ params }) {
  const [week, setWeek] = useState(null);
  const [editing, setEditing] = useState(false);
  const id = params.id;

  useEffect(() => {
    fetch(`/api/weeks/${id}`)
      .then((r) => r.json())
      .then((d) => setWeek(d));
  }, [id]);

  if (!week) return <p>Loading...</p>;

  async function save() {
    const res = await fetch(`/api/weeks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(week)
    });
    if (res.ok) {
      setEditing(false);
      // re-fetch to get canonical data
      const refreshed = await fetch(`/api/weeks/${id}`).then((r) => r.json());
      setWeek(refreshed);
    } else {
      alert("Save failed");
    }
  }

  function updateLesson(idx, updatedLesson) {
    const newLessons = [...week.lessons];
    newLessons[idx] = updatedLesson;
    setWeek({ ...week, lessons: newLessons });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <EditableText editing={editing} value={week.title} onChange={(v) => setWeek({ ...week, title: v })} className="text-2xl font-bold" />
          <p className="text-slate-600">Theme: {week.theme}</p>
        </div>
        <EditToggle onToggle={setEditing} />
      </div>

      <div className="card">
        <h4 className="font-semibold">Core Verse</h4>
        <EditableTextArea editing={editing} value={week.core_verse} onChange={(v) => setWeek({ ...week, core_verse: v })} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SnackList snacks={week.snacks} editing={editing} onChange={(snacks) => setWeek({ ...week, snacks })} />
        <div className="card">
          <h4 className="font-semibold mb-2">Meeting Days</h4>
          {editing ? (
            <EditableTextArea editing={editing} value={week.meeting_days.join("\n")} onChange={(v) => setWeek({ ...week, meeting_days: v.split("\n").map(s => s.trim()).filter(Boolean) })} />
          ) : (
            <p>{week.meeting_days.join(", ")}</p>
          )}
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Lessons</h3>
        <div className="space-y-4">
          {week.lessons.map((lesson, i) => (
            <LessonCard key={lesson.id} lesson={lesson} editing={editing} onUpdate={(l) => updateLesson(i, l)} />
          ))}
        </div>
      </section>

      {editing && (
        <div className="flex gap-3">
          <button onClick={save} className="px-4 py-2 bg-leaf text-white rounded">Save Week</button>
          <button onClick={() => setEditing(false)} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      )}
    </div>
  );
}
