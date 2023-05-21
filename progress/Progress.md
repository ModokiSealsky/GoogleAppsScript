# Progress
セルに進捗を表示するライブラリ。

## 表示項目
### Status
状態を表示する。
読込中、処理中、等、任意の文字列を表示する。

### Text
進捗の詳細値を文字列で表示する。
例：10/1234

### Graph
SPARKLINE関数の棒グラフ表示を利用してセルに進捗率を表示する。

### Message
任意のメッセージを表示する。

## 設定値
### MaxCount
処理件数最大値（処理対象件数など）を設定する。

### NowCount
現在の処理済み件数を設定する。

進捗率はNowCount/MaxCountとして表示する。

### StepCount
進捗表示を行う頻度を設定する。
5を設定した場合、処理中の画面更新を5回行う。
※意図的に画面を更新する頻度であり、処理時間が長い場合は意図せず画面更新される場合がある。

## 使い方
### インスタンス化
~~~javascript
const progress = Progress.getInstance();
~~~

### 表示セル設定
~~~javascript
progress.setProgressStatusCell(sheet.getRange("進捗ステータス"))
  .setProgressTextCell(sheet.getRange("進捗文字列"))
  .setProgressGraphCell(sheet.getRange("進捗グラフ"))
  .setProgressMessageCell(sheet.getRange("進捗メッセージ"));
~~~

### 表示更新
~~~javascript
const maxCount = sheet.getRange("処理件数最大値").getValue();
progress.setStepCount(sheet.getRange("更新頻度").getValue());
progress.setMaxCount(maxCount);
progress.setNowCount(0);
for (let i = 0; i < maxCount; i++) {
  progress.setNowCount(i);
}
~~~

### 状態表示
~~~javascript
progress.setStatus("完了");
~~~

### メッセージ表示
~~~javascrit
progress.setMessage("正常に処理されました。");
~~~
