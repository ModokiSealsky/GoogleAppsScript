function getInstance() {
  return new Progress();
}

class Progress {

  constructor() {
    this._progressStatusCell = null;
    this._progressTextCell = null;
    this._progressGraphCell = null;
    this._progressMessageCell = null;
    this._stepCount = 5;
    this._maxCount = 0;
    this._nowCount = 0;
    this._flashCount = 1;
  }

  /**
   * 画面更新基準値を計算
   */
  _calcFlashCount() {
    if (this._maxCount == 0 || this._stepCount == 0) {
      return;
    }
    this._flashCount = Math.round(this._maxCount / this._stepCount);
  }

  /**
   * 進捗ステータス表示セルを設定
   * @param cellRange {SpreadsheetApp.Range} 進捗ステータス表示セル
   */
  setProgressStatusCell(cellRange) {
    this._progressStatusCell = cellRange;
    if (cellRange) {
      cellRange.clearContent();
    }
    return this;
  }

  /**
   * 進捗文字列表示セルを設定
   * @param cellRange {SpreadsheetApp.Range} 進捗文字列表示セル
   */
  setProgressTextCell(cellRange) {
    this._progressTextCell = cellRange;
    if (cellRange) {
      cellRange.clearContent();
    }
    return this;
  }

  /**
   * 進捗グラフ表示セルを設定
   * @param cellRange {SpreadsheetApp.Range} 進捗グラフ表示セル
   */
  setProgressGraphCell(cellRange) {
    this._progressGraphCell = cellRange;
    if (cellRange) {
      cellRange.clearContent();
    }
    return this;
  }

  /**
   * 進捗メッセージ表示セルを設定
   * @param cellRange {SpreadsheetApp.Range} 進捗メッセージ表示セル
   */
  setProgressMessageCell(cellRange) {
    this._progressMessageCell = cellRange;
    if (cellRange) {
      cellRange.clearContent();
    }
    return this;
  }

  /**
   * 更新頻度を設定
   * @param maxCount {Int} 更新頻度
   */
  setStepCount(stepCount) {
    this._stepCount = stepCount;
    this._calcFlashCount();
  }

  /**
   * 処理件数最大値を設定
   * @param maxCount {Int} 処理件数最大値
   */
  setMaxCount(maxCount) {
    this._maxCount = maxCount;
    this._calcFlashCount();
    return this;
  }

  /**
   * 処理済数を設定
   * @param nowCount {Int} 処理済数
   */
  setNowCount(nowCount) {
    this._nowCount = nowCount;
    this._flashCell();
  }

  /**
   * 画面更新
   */
  _flashCell() {
    if (this._progressTextCell) {
      this._progressTextCell.setValue(`${this._nowCount}/${this._maxCount}`);
    }
    if (this._progressGraphCell) {
      this._progressGraphCell.setValue(`=SPARKLINE(${this._nowCount}, {"charttype","bar";"max",${this._maxCount}})`);
    }
    if (this._nowCount == 0
      || this._nowCount == this._maxCount
      || this._nowCount % this._flashCount == 0) {
      SpreadsheetApp.flush();
    }
  }

  /**
   * 状態文字列を設定
   * @param status {String} 状態文字列
   */
  setStatus(status) {
    if (this._progressStatusCell) {
      this._progressStatusCell.setValue(status);
      SpreadsheetApp.flush();
    }
  }

  /**
   * メッセージを設定
   * @param message {String} メッセージ
   */
  setMessage(message) {
    if (this._progressMessageCell) {
      this._progressMessageCell.setValue(message);
      SpreadsheetApp.flush();
    }
  }
}
