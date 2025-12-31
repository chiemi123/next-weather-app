// app/weather/[city]/page.tsx
import Link from "next/link";
import { CurrentWeather } from "./components/CurrentWeather";
import { ForecastGrid } from "./components/ForecastGrid";
import { SaveHistoryClient } from "./components/SaveHistoryClient";

type ForecastCondition = {
  text: string;
  icon: string;
};

type ForecastDay = {
  date: string;
  day: {
    avgtemp_c: number;
    mintemp_c: number;
    maxtemp_c: number;
    condition: ForecastCondition;
  };
};

type WeatherApiResponse = {
  location?: { name?: string; country?: string };
  current?: {
    temp_c?: number;
    humidity?: number;
    wind_kph?: number;
    condition?: { text?: string; icon?: string };
  };
  forecast?: {
    forecastday?: ForecastDay[];
  };
};

export const dynamic = "force-dynamic"; // 毎回最新（SSR）

async function getWeather(city: string): Promise<WeatherApiResponse> {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL ?? ""
    }/api/weather?city=${encodeURIComponent(city)}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`天気情報の取得に失敗しました (${res.status})`);
  }
  return res.json();
}

export default async function WeatherPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  // ① まず Promise から中身を取り出す
  const { city: rawCity } = await params;

  // ② URLエンコードされていたら戻す
  const city = decodeURIComponent(rawCity);

  // ③ ここでやっとAPIを呼ぶ
  const data = await getWeather(city);

  const name = data.location?.name ?? city;
  const country = data.location?.country ?? "";
  const temp = data.current?.temp_c ?? "-";
  const hum = data.current?.humidity ?? "-";
  const wind = data.current?.wind_kph ?? "-";
  const desc = data.current?.condition?.text ?? "-";
  const icon = data.current?.condition?.icon;
  const iconUrl = icon?.startsWith("//") ? `https:${icon}` : icon;

  const forecastDays = data.forecast?.forecastday ?? [];

  const displayDays = Array.from({ length: 7 }, (_, index) => {
    return forecastDays[index] ?? null;
  });

  return (
    <div className="space-y-4">
      <SaveHistoryClient city={city} country={country} iconUrl={iconUrl} />
      <Link
        href="/"
        className="inline-flex items-center text-sm text-sky-600 hover:underline"
      >
        ← トップに戻る
      </Link>

      <CurrentWeather
        name={name}
        country={country}
        temp={temp}
        humidity={hum}
        wind={wind}
        desc={desc}
        iconUrl={iconUrl}
      />

      <ForecastGrid days={displayDays} />
    </div>
  );
}
