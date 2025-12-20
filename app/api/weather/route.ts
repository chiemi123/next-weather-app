// app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const apiKey = process.env.WEATHER_API_KEY;

  if (!city) {
    return NextResponse.json(
      { error: { message: "都市名が指定されていません", code: "CITY_REQUIRED" } },
      { status: 400 }
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      {
        error: {
          message: "APIキーが設定されていません",
          code: "API_KEY_MISSING",
        },
      },
      { status: 500 }
    );
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
    city
  )}&days=7&lang=ja`;

  const res = await fetch(url, { cache: "no-store" });

  // ← ここを詳しくする
  if (!res.ok) {
    return NextResponse.json(
      {
        error: {
          message: "天気情報の取得に失敗しました",
          code: "WEATHER_API_ERROR",
          status: res.status,
        },
      },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
