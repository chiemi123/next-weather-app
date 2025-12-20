import { ForecastCard } from "./ForecastCard";

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
  days: (ForecastDay | null)[];
};

export function ForecastGrid({ days }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-7 gap-4">
      {days.map((day, index) => (
        <ForecastCard key={index} day={day} />
      ))}
    </div>
  );
}
