// app/weather/[city]/error.tsx
"use client";

import Link from "next/link";

export default function WeatherError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const message = error.message;

  // ❶ ネットワークエラー
  const isNetworkError = message.includes("Failed to fetch");

  // ❷ APIキーエラー（401）
  const isApiKeyError = message.includes("(401)");

  // ❸ 存在しない都市（400）
  const isCityNotFound = message.includes("(400)");

  let title = "エラーが発生しました";
  let description = "問題が発生しました。もう一度お試しください。";

  if (isNetworkError) {
    description =
      "通信エラーが発生しました。ネットワーク設定を確認して再度お試しください。";
  } else if (isApiKeyError) {
    description = "APIキーが無効です。有効なキーを設定して再度お試しください。";
  } else if (isCityNotFound) {
    description =
      "お探しの都市は見つかりませんでした。都市名を確認して再度お試しください。";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold mb-6">❗ {title}</h1>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center shadow space-y-4">
        <p className="text-red-700 font-medium">{description}</p>

        {/* 🔄 再読み込みボタン */}
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-sky-600 text-white rounded shadow hover:bg-sky-700 transition w-full"
        >
          再読み込み
        </button>

        {/* 🏠 トップへ戻るボタン（追加） */}
        <Link
          href="/"
          className="block px-4 py-2 bg-gray-200 text-gray-800 rounded shadow hover:bg-gray-300 transition w-full"
        >
          トップへ戻る
        </Link>
      </div>

      {/* デバッグ用：エラー内容表示（必要なら削除OK） */}
      <p className="text-xs text-gray-400 mt-6">{error.message}</p>
    </div>
  );
}
