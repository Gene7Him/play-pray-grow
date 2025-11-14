import { redis } from "../../../../lib/redis";

export async function GET(req, { params }) {
  try {
    const week = await redis.json.get(`week:${params.id}`);
    if (!week) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify(week), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    await redis.json.set(`week:${params.id}`, "$", body);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
