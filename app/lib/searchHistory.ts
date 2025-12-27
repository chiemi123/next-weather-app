const STORAGE_KEY = "recent_cities_v2";
const MAX_HISTORY = 5;

export type CityHistory = {
  city: string;
  country?: string;
  iconUrl?: string;
};

export function getSearchHistory(): CityHistory[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  try {
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSearchHistory(entry: CityHistory) {
  if (typeof window === "undefined") return;

  const history = getSearchHistory();
  const newHistory = [
    entry,
    ...history.filter((item) => item.city !== entry.city),
  ].slice(0, MAX_HISTORY);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
}

export function removeCity(city: string) {
  if (typeof window === "undefined") return;

  const history = getSearchHistory();
  const newHistory = history.filter((item) => item.city !== city);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
}

export function clearSearchHistory() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}
