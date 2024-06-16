/** 総当たりケース作成. */
class RoundRobinCreator {
  /**
   * ケース数算出.
   * @param {string[]} columns 項目配列
   * @return {integer[]}
   */
  calcRows(columns) {
    const lenArray = columns.map(elm => elm.length);
    let rows = 1;
    lenArray.forEach(elm => rows *= elm);
    Logger.log(`総ケース数：${rows}(${lenArray})`);
    return rows;
  }

  /**
   * 深さ毎の重複行サイズ算出.
   * @param {string[][]} columns 項目配列
   * @return {integer[]}
   */
  _calcDepthRows(columns) {
    const length = columns.length;
    const deptRows = [];
    for (let i = 0; i < length; i++) {
      let rows = 1;
      for (let j = i + 1; j < length; j++) {
        rows *= columns[j].length;
      }
      deptRows.push(rows);
    }
    Logger.log(`深さ別重複行：${JSON.stringify(deptRows)}`);
    return deptRows;
  }

  /**
   * 総当たり配列生成.
   * @param {string[]} columns 項目配列
   * @return {string[][]} 出力範囲
   */
  createRoundRobinValues(columns) {
    const crossValues = [];
    const rows = this.calcRows(columns)
    const depthRows = this._calcDepthRows(columns);
    for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
      const rowValues = [];
      for (let colIdx = 0; colIdx < columns.length; colIdx++) {
        const idx = parseInt(rowIdx / depthRows[colIdx]) % columns[colIdx].length;
        rowValues.push(columns[colIdx][idx]);
      }
      crossValues.push(rowValues);
    }
    Logger.log(`総当たりケース：${JSON.stringify(crossValues)}`);
    return crossValues;
  }

  /**
   * 除外ケース配列作成.
   * @param {string[][]} caseRows
   * @param {object} ignoreCase
   * @return {string[][]}
   */
  createIgnoreValues(caseRows, ignoreCase) {
    const ignoreRows = [];
    for (let i = 0; i < caseRows.length; i++) {
      const row = caseRows[i];
      let isIgnore = true;
      for (const igCase of ignoreCase) {
        isIgnore = true;
        for (const igIdx of Object.keys(igCase)) {
          const _c = igCase[igIdx];
          const _v = row[parseInt(igIdx)];
          const _i = igCase[igIdx].indexOf(_v);
          if (_i < 0) {
            isIgnore = false;
            break;
          }
        }
        if (isIgnore) {
          break;
        }
      }
      if (isIgnore) {
        ignoreRows.push(["×"]);
      } else {
        ignoreRows.push([""]);
      }
    }
    Logger.log(ignoreRows);
    return ignoreRows;
  }
}
