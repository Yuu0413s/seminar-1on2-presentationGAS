# uraki-takahashi-1on1

ゼミの1on1予約管理システム。  
Google Apps Script (GAS) + clasp で管理し、Googleスプレッドシートに毎週金曜日の予約シートを自動生成する。

## 運用フロー

1. 学生がシートに名前を記入（背景：白）
2. 毎週金曜13:10に `markActiveSlots` が実行  
   → 名前が入っている行の背景を緑（`#00ff00`）に変更
3. 1on2終了後、学生が手動でセルをグレー（`#999999`）に変更
4. `checkAndMarkDone` が15分おきに実行  
   → グレーかつ終了時刻を過ぎた行に「済(Done)」を記入し、counterシートにカウントを加算

## ファイル構成

| ファイル | 役割 |
|---|---|
| `config.js` | 定数・設定値 |
| `manageSheets.js` | シートの生成・アーカイブ処理 |
| `setupSheet.js` | シートのレイアウト・初期データ設定 |
| `markSlots.js` | 予約行の色付け・済みマーク処理 |
| `counter.js` | counterシートのカウント加算・ソート機能 |
| `utils.js` | 共通関数（getFriday, formatDate, parseTime） |

## トリガー設定

| 関数名 | 実行タイミング |
|---|---|
| `manageSheets` | 毎週月曜日・時間ベース |
| `markActiveSlots` | 毎週金曜日・午後1時〜2時 |
| `checkAndMarkDone` | 15分おき・分ベース |

> トリガーはGASエディタの「トリガー」画面から手動で設定する。

## シート構成

### 日付シート（例: 2026-05-16）

- A列: 時限ラベル（3rd / 4th / 5th）
- B列: 開始時間
- C列: 終了時間
- D列: 予約者名
- E列: 状態
- F列: 要望
- G列: 先生からの連絡

行10〜16は発表用枠（4th period）のため `markActiveSlots` / `checkAndMarkDone` の処理対象外。

### counterシート

学生ごとの1on1実施回数を記録する。  
名前は `苗字(学年)` 形式（例: `Shibata(B2)`）で入力する。

スプレッドシートのメニュー「1on2管理」からソートが可能。

| メニュー項目 | 動作 |
|---|---|
| 名前順でソート | アルファベット昇順 |
| 学年順でソート（昇順） | B1→B2→B3→B4→M1→M2 |
| 学年順でソート（降順） | M2→M1→B4→B3→B2→B1 |
| 発表回数順でソート（昇順） | 回数が少ない順 |
| 発表回数順でソート（降順） | 回数が多い順 |

> 行2は固定（ソート対象外）。行3以降がソートされる。

## セットアップ

### 前提条件

- [clasp](https://github.com/google/clasp) がインストール済みであること
- GASプロジェクトとスプレッドシートが紐付けられていること

### ローカルへのクローン後

```bash
clasp login
clasp pull   # GASの最新コードを取得
```

### コードをGASに反映

```bash
clasp push
```

### トリガーの設定

GASエディタ → 左サイドバーの「トリガー（時計アイコン）」から上記3関数を設定する。

## 注意事項

- `manageSheets` / `markActiveSlots` / `checkAndMarkDone` の関数名はトリガーに登録されているため変更禁止
- `.clasp.json` には `scriptId` が含まれるためgit管理から除外している（`.gitignore` 参照）
