import { redis } from "../../../lib/redis";
import seed from "../../../data/seed-week1.json";

export async function GET() {
  try {
    // force fetch instead of cache
    const existing = await redis.json.get("week:1");

    // reseed only if missing OR malformed
    if (!existing || !existing.week_id) {
      await redis.json.set("week:1", "$", seed);
    }

    const keys = await redis.keys("week:*");
    const out = [];

    for (const k of keys) {
      const w = await redis.json.get(k);
      out.push(w);
    }

    return new Response(JSON.stringify(out), {
      status: 200,
      headers: { "Cache-Control": "no-store" }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    // 1. Get the new week's data from the request
    const newData = await req.json();

    // 2. Find the next available week ID
    const allWeekKeys = await redis.keys("week:*"); // e.g., ["week:1", "week:2"]
    
    // This is a safer way to get the next ID
    const weekIds = allWeekKeys.map(key => parseInt(key.split(':')[1]));
    const maxId = Math.max(0, ...weekIds); // Find the highest ID, or 0 if empty
    const nextId = maxId + 1;

    // 3. Set the new ID on the data object
    newData.week_id = nextId;
    const key = `week:${nextId}`;

    // 4. Save the new week to Redis as JSON
    await redis.json.set(key, "$", newData);

    // 5. Send a success response back with the new data
    return new Response(JSON.stringify({ success: true, newWeek: newData }), {
      status: 201, // 201 means "Created"
    });
  } catch (error)
  {
    console.error("POST Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

