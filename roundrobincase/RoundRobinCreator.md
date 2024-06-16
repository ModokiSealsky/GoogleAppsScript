# RoundRobinCreator

総当たりケースを生成するライブラリ。
Googleスプレッドシートで扱いやすくするため、「行」「列」の二次元配列を生成する。

## スプレッドシートとライブラリの仲介

シートの値を取得、シートへの出力はライブラリでは行わない。
スプレッドシートとRoundRobinCreatorクラスの間となる実装は

## 使い方

### インスタンス化

~~~javascript
const creator = new RoundRobinCreator();
~~~

### シートから設定値を取得

タイトル、ケースをそれぞれ配列で取得する。
範囲.getValues()は「行」「列」形式の二次元配列となるため、先頭要素の配列のみ使う。

除外ケースは1セル内に記載してあるのでJSON.parseで配列に変換する。
（文字補完などはスプレッドシートへの記載しやすさも考慮して決める）

~~~javascript
const titleRange = inputSheet.getRange("タイトル開始位置");
const caseRange = inputSheet.getRange("ケース開始位置");
const titles = inputSheet.getRange(titleRange.getRow(), titleRange.getColumn(), 1, inColLen).getValues()[0];
const caseArray = inputSheet.getRange(caseRange.getRow(), caseRange.getColumn(), 1, inColLen).getValues()[0];
const ignoreCase = JSON.parse("[" + inputSheet.getRange("排除ケース").getValue() + "]");
 ~~~

### 設定値の解析

取得した設定値を元に処理するためのオブジェクトに変換する。
オブジェクトがもつケースの配列を元に総当たりケースの配列を生成する。
ケースの配列と書が居設定値を元に除外ケースの配列を生成する。

~~~javascript
const rrValues = creator.createRoundRobinValues(caseArray.map(elm => elm.split("\n")));
const ignoreRows = creator.createIgnoreValues(rrValues, ignoreCase);
~~~

### シートへ出力

「行」「列」形式の二次元配列は範囲のサイズが一致していれば一括貼り付けができる。
ループ処理で1セルずつ設定する場合に比べて圧倒的に早い。

~~~javascript
outputSheet.getRange(OUTPUT_START_ROW, OUTPUT_START_COL, rrValues.length, colLength).setValues(rrValues);
outputSheet.getRange(OUTPUT_START_ROW, OUTPUT_START_COL + colLength, rrValues.length, 1).setValues(ignoreRows);
~~~
