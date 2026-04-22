# 🥗 栄養評価＆提案アプリ
 
毎日の食事を食品マスタから選択して記録し、厚労省が推奨する1日の摂取基準（DRI）と比較して不足している栄養素を可視化するWebアプリケーション。
 
## テーマ：人の生活の向上

### なぜこのテーマを選んだのか

エンジニアはよく栄養が偏る食事が多く生活習慣が良く悪化することもあり体調不良に陥りやすくなる環境下にある。現在は手軽に栄養素をとれるサプリなども存在する。そのため、栄養素の部分に焦点を当て簡単に不足している栄養素を表示しそれが取れる食事や食材、あるいはサプリを表示することで意識改革ができると考えたためこのアプリの制作に至った。

### こだわった点

　まず大前提として自分がとてもめんどくさがりなので毎回毎回数値入力をするのはとても手間がかかり、健康管理をするうえで継続的なコンテンツにならないのは致命的である。そのために今回は主要主食３項目とタンパク質の多い肉魚から選択し、大盛、普通、少なめから選んで２タップで記録できるという簡単さを追求した。
  次に

### 難しかったこと・できなかったこと

　人によっては細かく数値入力したい人がいるかもしれないためその人用に入力フォームを作成しようとしたが、時間がなかった。
 

### 技術選定理由

|技術|選定理由|
|---|---|
|  TypeScript  |現在学んでおりウェブアプリ作成に適していると考えた|
|postgreSQL|調べたところサーバーレスでデプロイする予定のvercelでそのまま使えて相性がいいと出てきたから|
|Drizzle ORM|vercelと相性がいいと出てきたから|
|vercel|導入が楽だから|

 今回バックエンドを置かなかったのは単純にAPIを使わないのとバージョン管理の手間を考えたためである。

---
 
## 技術スタック
 
| レイヤー | 技術 | 用途 |
|---|---|---|
| フロントエンド | Next.js 16.2.4 (App Router) | UIフレームワーク |
| 言語 | TypeScript | 型安全な開発 |
| UIコンポーネント | shadcn/ui + Tailwind CSS | デザインシステム |
| バリデーション | Zod | スキーマ検証 |
| ORM | Drizzle ORM | DB操作・型生成 |
| 認証 | NextAuth.js v4 | OAuth / Email認証 |
| DB | PostgreSQL (Neon) | データ永続化 |
| データフェッチ | SWR | データフェッチ |
| デプロイ | Vercel | ホスティング / Edge |
 
---
 
## 機能
 
### 食事記録タブ
- **カテゴリボタン選択** — ごはん・パン・麺・肉・魚の5種類から選択
- **量の選択** — 大盛り・普通・少なめの3段階からワンクリックで記録
- **記録管理** — 記録済み食品をカテゴリカラー付きタグで一覧表示、個別削除可能
- **栄養素バー** — DRI基準値との比較をリアルタイム更新、超過時は赤表示
- **不足アラート** — DRI 70%未満の栄養素を自動検出して警告表示
### 栄養分析タブ
- **サマリーカード** — 各栄養素のリングチャート付き達成率カードを5列表示
- **達成率バーチャート** — DRI比（%）の横棒グラフ、100%ラインと超過表示付き
- **カロリー内訳** — 食品別のカロリー比率をカテゴリカラーのバーで可視化
---
 
## UI設計
 
### デザイン方針
 
ダークテーマをベースとした、データ視認性を重視した設計。
 
| 項目 | 仕様 |
|---|---|
| テーマ | ダーク（背景 `#0f1117`） |
| フォント | Geist Sans（本文）/ Geist Mono（数値） |
| アクセントカラー | グリーン `#7eeaa0`、アンバー `#f9a84d`、ブルー `#5b8fff` |
| アニメーション | バー伸長（栄養素表示） |
 
### カテゴリカラー
 
| カテゴリ | カラー |
|---|---|
| 主食 | `#f9a84d` |
| 主菜 | `#5b8fff` |
| 副菜 | `#7eeaa0` |
| 汁物 | `#c084fc` |
| 果物 | `#fb7185` |
| 飲み物 | `#38bdf8` |
| 乳製品 | `#fde68a` |
 
### コンポーネント構成
 
```
Dashboard
├── Header                      # ロゴ・フェーズバッジ・日付
├── TabBar                      # 食事記録 / 栄養分析
│
├── [食事記録タブ]
│   ├── MealForm                # カテゴリ・量ボタン選択フォーム
│   ├── FoodTag                 # 記録済み食品タグ一覧
│   ├── NutrientBar             # 栄養素バー（DRI比較）
│   └── DeficiencyAlert         # 不足栄養素アラート
│
└── [栄養分析タブ]
    ├── StatCard                # リングチャート付きサマリーカード × 5
    ├── AchievementChart        # DRI達成率バーチャート
    └── CalorieBreakDown        # 食品別カロリー内訳バー
```
 
---
 
## プロジェクト構成
 
```
.
├── app/
│   ├── dashboard/
│   │   └── page.tsx            # ダッシュボード本体
│   ├── layout.tsx              # ルートレイアウト
│   └── page.tsx                # / → /dashboard にリダイレクト
├── components/
│   └── dashboard/
│       ├── header.tsx          # ヘッダー
│       ├── tab-bar.tsx         # タブ切り替え
│       ├── meal-form.tsx       # 食事入力フォーム
│       ├── food-tag.tsx        # 記録済み食品タグ
│       ├── nutrient-bar.tsx    # 栄養素進捗バー
│       ├── deficiency-alert.tsx # 不足栄養素アラート
│       ├── stat-card.tsx       # リングチャート付きカード
│       ├── achievement-chart.tsx # DRI達成率バーチャート
│       └── calorie-breakdown.tsx # カロリー内訳バー
├── lib/
│   ├── db/
│   │   ├── schema.ts           # Drizzle スキーマ定義
│   │   ├── index.ts            # DB接続
│   │   └── seed.ts             # 初期データ投入
│   ├── dri/
│   │   └── standards.ts        # DRI基準値・カラー定数
│   ├── meal-presets.ts         # 食事プリセットデータ
│   └── types.ts                # 型定義
├── actions/
│   └── meal.ts                 # Server Actions
├── auth.ts                     # NextAuth.js 設定
├── drizzle.config.ts           # Drizzle設定
└── drizzle/                    # マイグレーションファイル
```
 
---
 
## セットアップ
 
### 必要な環境
 
- Node.js 20 以上
- PostgreSQL（またはNeonアカウント）
### インストール
 
```bash
git clone (https://github.com/hiro0908/foodRecommend.git)
cd foodRecommend
npm install
```
 
### 環境変数の設定
 
`.env.local` を作成し、以下を設定してください。
 
```env
DATABASE_URL=postgresql://...
AUTH_SECRET=your-secret
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
```
 
### DBマイグレーションと食品マスタ初期データ投入
 
```bash
npm run db:generate    # マイグレーションファイル生成
npm run db:migrate     # DBへ適用
npm run db:seed        # 食品マスタの初期データを投入
```
 
### 開発サーバー起動
 
```bash
npm run dev
```
 
[http://localhost:3000](http://localhost:3000) でアクセスできます。
 
---
 
## DBスキーマ
 
```
foodMaster（食品マスタ）
  ├── id
  ├── name          「白米（中盛り）」「鮭の塩焼き」など
  ├── category      「主食」「主菜」「副菜」など
  ├── calories      kcal
  ├── protein       g
  ├── iron          mg
  ├── calcium       mg
  ├── vitaminC      mg
  └── selectSize    「160g」「1切れ」など
        ↑ 参照（FK）
mealRecords（食事記録）
  ├── id
  ├── userId
  ├── foodId        → foodMaster.id
  ├── quantity      何人前・何個か（デフォルト: 1）
  └── loggedAt
```
 
---
 
## 食事プリセット
 
`lib/meal-presets.ts` に5カテゴリ × 3サイズのプリセットを定義しています。
 
| カテゴリ | 大盛り | 普通 | 少なめ |
|---|---|---|---|
| ごはん | 白米 220g | 白米 160g | 白米 110g |
| パン | 食パン 2枚 | 食パン 1枚 | 食パン 半枚 |
| 麺 | うどん 300g | うどん 200g | うどん 100g |
| 肉 | 鶏むね肉 200g | 鶏むね肉 100g | 鶏むね肉 50g |
| 魚 | 鮭の塩焼き 2切れ | 鮭の塩焼き 1切れ | 鮭の塩焼き 半切れ |
 
---
 
## データフロー
 
```
カテゴリボタンを選択（ごはん・パン・麺・肉・魚）
  ↓
量のボタンを選択（大盛り・普通・少なめ）
  ↓
onAdd が呼ばれて records に追加
  ↓
栄養素合計を再計算
  ↓
NutrientBar・DeficiencyAlert をリアルタイム更新
  ↓
栄養分析タブ: StatCard・AchievementChart・CalorieBreakDown を更新
```
 
---
 
## DRI基準値について
 
厚労省「[日本人の食事摂取基準（2020年版）](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/eiyou/syokuji_kijyun.html)」に基づき、推奨量を `lib/dri/standards.ts` で管理しています。
 
不足アラートは **DRI比70%未満** の栄養素を対象とします

## 今後の展望

- 今後の機能としては不足した栄養素から今すぐ接種すべきおすすめの食事や食材を表示したい
- バックエンド入れてAIを導入しカメラ機能から食事の類推が出来るようにさせたい

