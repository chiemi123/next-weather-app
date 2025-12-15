# 🌤️ Next Weather App

## 📌 バージョン情報

- **v1.0.0**：今日の天気検索機能まで実装済み（完成版）
- 今後：7日間週間天気機能を追加予定


Next.js × TypeScript × Tailwind CSS

シンプルで使いやすい、都市名を入力して天気情報を取得できる Web アプリです。
Next.js（App Router）を使い、SSR・API ルート・エラーハンドリングを実装しています。

📸 スクリーンショット（任意）

※ここにあなたのアプリの画像を貼るとさらに良くなります

## 🚀 使用技術

| 分類           | 技術                                                |
| -------------- | --------------------------------------------------- |
| フレームワーク | Next.js 16（App Router）                            |
| 言語           | TypeScript                                          |
| UI             | Tailwind CSS                                        |
| API            | WeatherAPI（外部 API）                              |
| サーバー処理   | Next.js Route Handler（`app/api/weather/route.ts`） |
| データ取得     | SSR（毎回最新の天気を取得）                         |
| デプロイ       | Vercel（推奨）                                      |

## ✨ 主な機能

- 🔎 都市名で天気検索

- 🌤 気温・湿度・風速・天候アイコン表示

- 🧭 動的ルーティング /weather/[city]

- 🔁 SSR により毎回最新の天気取得

## 週間天気について（API制限に関する補足）

本アプリでは、WeatherAPI を利用して天気情報を取得しています。

週間天気は **7日分の表示枠**を用意していますが、  
使用している WeatherAPI の **フリープランでは最大3日分まで**しか
予報データを取得できません。

そのため、

- 取得できた日（最大3日分）は実際の天気データを表示
- 取得できない日（4〜7日目）は「未取得」としてプレースホルダー表示

を行うことで、

- UIのレイアウトを常に7日分で固定
- 将来的に有料プランへ切り替えた場合もUI変更なしで対応可能

という設計にしています。

#### 🛠 強力なエラーハンドリング

- 存在しない都市名

- API キーエラー

- ネットワーク障害

- サーバー内部エラー

- 📱 レスポンシブデザイン（スマホ対応）

## 🏗️ ディレクトリ構造

app
├─ page.tsx                # トップページ（検索フォーム）
|_ layout.tsx              # レイアウトページ
├─ weather
│  └─ [city]
│     ├─ page.tsx          # 天気詳細ページ（司令塔）
│     ├─ error.tsx         # 天気ページ用エラー画面
|     |_ loading.tsx       # 天気ページ用ロード画面
│     └─ components        # 天気ページ専用コンポーネント
│        ├─ CurrentWeather.tsx  # 今日の天気表示
│        ├─ ForecastGrid.tsx    # 週間天気の一覧表示（7日分）
│        └─ ForecastCard.tsx    # 1日分の天気カード
└─ api
   └─ weather
      └─ route.ts          # 天気API取得（Route Handler）


## 🔧 セットアップ

#### 1. リポジトリを clone

`git clone https://github.com/あなたのユーザー名/weather-app.git
cd weather-app`

#### 2. 依存パッケージのインストール

`npm install`

#### 🔑 API キーの設定

プロジェクト直下に .env.local を作成し、以下を追加します：

`WEATHER_API_KEY=あなたのAPIキー
NEXT_PUBLIC_BASE_URL=http://localhost:3000`

※ .env.local は Git リポジトリに含めないでください（自動で無視されます）

#### ▶ 開発サーバー起動

`npm run dev`

ブラウザで：

http://localhost:3000

へアクセス。

#### 🌩 エラー処理

次の各ケースでわかりやすいエラー画面を表示します。

ケース 表示内容
存在しない都市名 「お探しの都市は見つかりませんでした」
API キー未設定 「API キーが正しく設定されていません」
API 障害 「問題が発生しました」
サーバー内部エラー エラーページ（error.tsx）が発動

Next.js の error.tsx を活用し、落ちないアプリを実現しています。

#### 🧪 テスト内容（実施済み）

正常系：Tokyo などの都市名で検索

エラー系：存在しない都市の検索

API URL 破壊テスト（500 エラー）

Route Handler 強制エラー（throw new Error）

ネットワーク断（機内モード）

API キー削除時のハンドリング

すべて正常に動作を確認済みです。

#### 🚀 デプロイ（Vercel 推奨）

1. GitHub にリポジトリを作る
2. コードを push
3. Vercel → New Project から GitHub をインポート
4. 環境変数（API キー）を設定
5. Deploy をクリック

Next.js は Vercel 開発元のため、最も相性の良いデプロイ方法です。

#### 📝 今後の拡張予定

- 🌦 週間天気表示（forecast API 連携）

- 🔍 オートコンプリート検索

- 🗺 地図表示（Leaflet / Google Maps）

- 💾 検索履歴保存（LocalStorage）

- 🎨 ダークモード対応

#### 👤 作者

- 名前：あなたの名前

- GitHub：https://github.com/あなたのユーザー名

- ポートフォリオ URL（任意）
