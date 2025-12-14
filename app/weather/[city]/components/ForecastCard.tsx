import Image from "next/image";

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

type Props = {
  day: ForecastDay | null;
};

export function ForecastCard({ day }: Props) {
  if (!day) {
    return (
      <div className="rounded-lg bg-gray-100 p-4 text-center text-gray-400">
        <p className="text-sm">--</p>
        <p className="text-xs">未取得</p>
      </div>
    );
  }

  const iconUrl = day.day.condition.icon.startsWith("//")
    ? `https:${day.day.condition.icon}`
    : day.day.condition.icon;

  return (
    <div className="rounded-lg bg-white p-4 shadow text-center space-y-1">
      <p className="text-sm font-medium">{day.date}</p>

      <Image
        src={iconUrl}
        alt={day.day.condition.text}
        width={48}
        height={48}
        className="mx-auto"
      />

      <p className="text-sm">{day.day.condition.text}</p>

      <p className="text-lg font-bold">{day.day.avgtemp_c}℃</p>

      <p className="text-xs text-gray-500">
        {day.day.mintemp_c}℃ / {day.day.maxtemp_c}℃
      </p>
    </div>
  );
}
