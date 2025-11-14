import WeekCard from "../components/WeekCard";
import Link from 'next/link';

async function getWeeks() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/weeks`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const weeks = await getWeeks();

  return (
    <main className="space-y-6">
      <div className="card flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome — Play, Pray, Grow</h2>
          <p className="text-slate-600 mt-1">Open your weekly plans and edit them in Edit Mode.</p>
        </div>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Weekly Plans</h3>
        <div className="grid grid-cols-1 gap-4">
          {weeks.length === 0 && <p className="text-slate-600">No weeks yet.</p>}
          {weeks.map((w) => <WeekCard key={w.week_id} week={w} />)}
          <Link href="/week/new">
            <button>Add New Week</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
