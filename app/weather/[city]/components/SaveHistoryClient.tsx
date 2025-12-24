"use client";

import { useEffect } from "react";
import { saveSearchHistory } from "@/app/lib/searchHistory";

export function SaveHistoryClient({ city }: { city:string }) {
    useEffect(() => {
        saveSearchHistory(city);
    }, [city]);

    return null;
}