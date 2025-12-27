// app/page.tsx
"use client";

import { getSearchHistory } from "@/app/lib/searchHistory";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const updateHistory = () => {
      const stored = getSearchHistory();
      if (Array.isArray(stored)) {
        setHistory(stored);
      }
    };

    // 初回 & タブに戻った時に実行
    updateHistory();
    window.addEventListener("focus", updateHistory);

    return () => {
      window.removeEventListener("focus", updateHistory);
    };
  }, []);

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

      {history.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold mb-2 text-gray-600">
            最近検索した都市
          </h2>
          <ul className="flex flex-wrap gap-2">
            {history.map((city) => (
              <li key={`history-${city}`}>
                <Link
                  href={`/weather/${city}`}
                  className="px-3 py-1 rounded-full bg-slate-100 text-sm hover:bg-slate-200"
                >
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

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
