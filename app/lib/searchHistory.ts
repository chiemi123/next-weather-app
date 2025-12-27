const STORAGE_KEY = "recent_cities";
const MAX_HISTORY = 5;

export function getSearchHistory(): string[] {
    if (typeof window === "undefined") return [];

    const stored =localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) :[];
}

export function saveSearchHistory(city: string) {
    if (typeof window === "undefined") return;

    const history = getSearchHistory();
    const newHistory = [
        city,
        ...history.filter((item) => item !== city),
    ].slice(0, MAX_HISTORY);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
}

export function removeCity(city: string) {
    if (typeof window === "undefined") return;

    const history = getSearchHistory();
    const newHistory = history.filter((item) => item !== city);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
}

export function clearSearchHistory() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}
