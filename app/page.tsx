// app/page.tsx
"use client";

import type { CityHistory } from "@/app/lib/searchHistory";
import {
  clearSearchHistory,
  getSearchHistory,
  removeCity,
} from "@/app/lib/searchHistory";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const router = useRouter();
  const [history, setHistory] = useState<CityHistory[]>([]);
  const [suggestions, setSuggestions] = useState<CityHistory[]>([]);

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

  // city 入力が変わるたびに候補一覧を更新
  useEffect(() => {
    if (!city.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = history.filter((item) =>
      item.city.toLowerCase().includes(city.trim().toLowerCase())
    );
    setSuggestions(filtered);
  }, [city, history]);

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

      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded-lg bg-white shadow-sm text-sm">
          {suggestions.map((item) => (
            <li
              key={`suggestion-${item.city}`}
              onClick={() =>
                router.push(`/weather/${encodeURIComponent(item.city)}`)
              }
              className="cursor-pointer px-3 py-2 hover:bg-sky-100"
            >
              {item.city}
              {item.country && (
                <span className="ml-1 text-xs text-gray-500">
                  ({item.country})
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold mb-2 text-gray-600">
            最近検索した都市
          </h2>
          <ul className="flex flex-wrap gap-2">
            {history.map((item) => (
              <li
                key={`history-${item.city}`}
                className="flex items-center gap-2"
              >
                <Link
                  href={`/weather/${item.city}`}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-sm hover:bg-slate-200"
                >
                  {/* 天気アイコンがあれば表示 */}
                  {item.iconUrl && (
                    <img
                      src={item.iconUrl}
                      alt={`${item.city} weather icon`}
                      className="w-4 h-4"
                    />
                  )}

                  {/* 都市名 */}
                  <span>{item.city}</span>

                  {/* 国名があれば表示 */}
                  {item.country && (
                    <span className="text-gray-500 text-xs">
                      ({item.country})
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => {
                    removeCity(city);
                    setHistory((prev) =>
                      prev.filter((h) => h.city !== item.city)
                    );
                  }}
                  className="text-slate-400 hover:text-red-500 text-sm"
                  aria-label={`${city} を履歴から削除`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              clearSearchHistory();
              setHistory([]);
            }}
            className="text-xs text-red-500 underline hover:text-red-600"
          >
            履歴をすべて削除
          </button>
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
