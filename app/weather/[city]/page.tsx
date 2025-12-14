// app/weather/[city]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ForecastCard } from "./components/ForecastCard";

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
      <Link
        href="/"
        className="inline-flex items-center text-sm text-sky-600 hover:underline"
      >
        ← トップに戻る
      </Link>

      <section className="rounded-xl bg-white p-6 shadow-md space-y-4">
        <h2 className="text-2xl font-bold">
          {name}
          {country ? `（${country}）` : ""} の天気
        </h2>

        <div className="flex items-center gap-4">
          {iconUrl && (
            <Image
              src={iconUrl}
              alt={desc ?? "weather icon"}
              width={64}
              height={64}
              className="h-16 w-16"
            />
          )}
          <div>
            <p className="text-lg font-medium">{desc}</p>
            <p className="text-4xl font-bold">
              {temp}
              <span className="text-xl font-normal"> ℃</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg bg-slate-100 p-4">
            <p className="text-xs text-gray-500">湿度</p>
            <p className="text-lg font-semibold">{hum} %</p>
          </div>
          <div className="rounded-lg bg-slate-100 p-4">
            <p className="text-xs text-gray-500">風速</p>
            <p className="text-lg font-semibold">{wind} km/h</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-7 gap-4">
          {displayDays.map((day, index) => (
            <ForecastCard key={index} day={day} />
          ))}
        </div>
      </section>
    </div>
  );
}
