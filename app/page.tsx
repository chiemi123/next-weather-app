// app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = city.trim();
    if (!q) return; // 空欄対策
    router.push(`/weather/${encodeURIComponent(q)}`);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold">都市名で天気を検索</h2>
        <p className="mb-4 text-sm text-slate-600">
          例：Tokyo, Osaka, Sapporo, Nagoya など
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="都市名を入力"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
          <button
            type="submit"
            disabled={!city.trim()}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            検索
          </button>
        </form>
      </section>

      <section className="text-xs text-slate-500">
        ※ データ提供:{" "}
        <a
          href="https://www.weatherapi.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sky-600 underline"
        >
          WeatherAPI.com
        </a>
      </section>
    </div>
  );
}
