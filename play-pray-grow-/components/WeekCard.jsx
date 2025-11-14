import Link from "next/link";

export default function WeekCard({ week }) {
  return (
    <Link href={`/week/${week.week_id}`} className="block card hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">{week.title}</h3>
          <p className="text-sm text-slate-600">{week.theme}</p>
        </div>
        <div className="text-sm text-slate-500">Week {week.week_id}</div>
      </div>
    </Link>
  );
}
