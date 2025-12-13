// app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return NextResponse.json({ error: "city is required" }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "WEATHER_API_KEY is missing" },
      { status: 500 }
    );
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&lang=ja`;

  const res = await fetch(url, { cache: "no-store" });

  // ← ここを詳しくする
  if (!res.ok) {
    const text = await res.text(); // WeatherAPIが返したエラー文
    return NextResponse.json(
      {
        error: "WeatherAPI returned an error",
        status: res.status,
        body: text,
      },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
