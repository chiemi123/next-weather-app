"use client";

import { saveSearchHistory } from "@/app/lib/searchHistory";
import { useEffect } from "react";

type Props = {
  city: string;
  country?: string;
  iconUrl?: string;
};

export function SaveHistoryClient({ city, country, iconUrl }: Props) {
  useEffect(() => {
    saveSearchHistory({ city, country, iconUrl });
  }, [city, country, iconUrl]);

  return null;
}
