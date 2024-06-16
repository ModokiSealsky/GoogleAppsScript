/** 件数見出し出力セル. */
const OUTPUT_ROWS_TITLE = "B2";
/** 件数出力セル. */
const OUTPUT_ROWS_VALUE = "C2";
/** タイトル出力行. */
const OUTPUT_TITLE_ROW = 3;
/** タイトル出力行. */
const OUTPUT_CASE_ROW = 4;
/** 出力開始行. */
const OUTPUT_START_ROW = 5;
/** 出力開始列. */
const OUTPUT_START_COL = 2;

/**
 * エンドポイント
 */
function execute() {
  // 入力値取得
  const inputSheet = SpreadsheetApp.getActiveSheet();
  const titleRange = inputSheet.getRange("タイトル開始位置");
  const caseRange = inputSheet.getRange("ケース開始位置");
  const inColLen = parseInt(inputSheet.getRange("列数").getValue());

  const titles = inputSheet.getRange(titleRange.getRow(), titleRange.getColumn(), 1, inColLen).getValues()[0];
  const caseArray = inputSheet.getRange(caseRange.getRow(), caseRange.getColumn(), 1, inColLen).getValues()[0];
  Logger.log(`タイトル：${JSON.stringify(titles)}|ケース：${JSON.stringify(caseArray)}`);
  const ignoreCase = JSON.parse("[" + inputSheet.getRange("排除ケース").getValue() + "]");
  Logger.log(`排除ケース：${JSON.stringify(ignoreCase)}`);

  // 値生成
  const creator = new RoundRobinCreator();
  const rrValues = creator.createRoundRobinValues(caseArray.map(elm => elm.split("\n")));
  const ignoreRows = creator.createIgnoreValues(rrValues, ignoreCase);

  // 出力
  const outputSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("出力");
  _output(outputSheet, titles, caseArray, rrValues, ignoreRows);
}

/**
 * 出力.
 * @param {SpreadsheetApp.Sheet} outputSheet
 * @param {string[]} titles
 * @param {string[]} caseArray
 * @param {string[][]} rrValues
 * @param {string[]} ignoreRows
 */
function _output(outputSheet, titles, caseArray, rrValues, ignoreRows) {
  outputSheet.clear();
  const colLength = titles.length;
  // タイトル出力
  outputSheet.getRange(OUTPUT_TITLE_ROW, OUTPUT_START_COL, 1, colLength).setValues([titles]);
  // ケース出力
  outputSheet.getRange(OUTPUT_CASE_ROW, OUTPUT_START_COL, 1, colLength).setValues([caseArray]);
  outputSheet.getRange(OUTPUT_START_ROW, OUTPUT_START_COL, rrValues.length, colLength).setValues(rrValues);
  // 件数出力
  outputSheet.getRange(OUTPUT_ROWS_TITLE).setValue("総件数");
  outputSheet.getRange(OUTPUT_ROWS_VALUE).setValue(rrValues.length);
  // 除外ケース出力
  outputSheet.getRange(OUTPUT_START_ROW, OUTPUT_START_COL + colLength, rrValues.length, 1).setValues(ignoreRows);
}
