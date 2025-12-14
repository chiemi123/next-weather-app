import Image from "next/image";

type Props = {
  name: string;
  country: string;
  temp: number | string;
  humidity: number | string;
  wind: number | string;
  desc: string;
  iconUrl?: string;
};

export function CurrentWeather({
  name,
  country,
  temp,
  humidity,
  wind,
  desc,
  iconUrl,
}: Props) {
  return (
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
          <p className="text-lg font-semibold">{humidity} %</p>
        </div>
        <div className="rounded-lg bg-slate-100 p-4">
          <p className="text-xs text-gray-500">風速</p>
          <p className="text-lg font-semibold">{wind} km/h</p>
        </div>
      </div>
    </section>
  );
}
