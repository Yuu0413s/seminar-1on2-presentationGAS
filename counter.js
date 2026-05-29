// スプレッドシートを開いたときにメニューを追加する
function onOpen() {
  SpreadsheetApp.getActiveSpreadsheet()
    .addMenu("1on2管理", [
      { name: "名前順でソート",                         functionName: "sortCounterByName"      },
      { name: "学年順でソート（昇順: B1→M2）",          functionName: "sortCounterByGradeAsc"  },
      { name: "学年順でソート（降順: M2→B1）",          functionName: "sortCounterByGradeDesc" },
      { name: "発表回数順でソート（昇順: 少ない順）",    functionName: "sortCounterByCountAsc"  },
      { name: "発表回数順でソート（降順: 多い順）",      functionName: "sortCounterByCountDesc" }
    ]);
}

// --- ソート共通処理 ---

function getCounterSortRange_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.COUNTER);
  if (!sheet) return null;
  var lastRow = sheet.getLastRow();
  if (lastRow < ROWS.COUNTER_SORT_START) return null;
  return sheet.getRange(ROWS.COUNTER_SORT_START, 1, lastRow - ROWS.COUNTER_SORT_START + 1, sheet.getLastColumn());
}

function sortCounter_(compareFn) {
  var range = getCounterSortRange_();
  if (!range) return;
  var data = range.getValues();
  data.sort(compareFn);
  range.setValues(data);
}

// counterシートを名前のアルファベット順でソートする
function sortCounterByName() {
  sortCounter_(function(a, b) {
    return a[0].toString().localeCompare(b[0].toString(), "ja");
  });
}

// counterシートを学年順でソートする（asc: 昇順, desc: 降順）
function sortCounterByGrade_(order) {
  sortCounter_(function(a, b) {
    var diff = gradeOrder_(extractGrade_(a[0])) - gradeOrder_(extractGrade_(b[0]));
    return order === "desc" ? -diff : diff;
  });
}

function sortCounterByGradeAsc()  { sortCounterByGrade_("asc");  }
function sortCounterByGradeDesc() { sortCounterByGrade_("desc"); }

// counterシートを発表回数順でソートする（asc: 昇順, desc: 降順）
function sortCounterByCount_(order) {
  sortCounter_(function(a, b) {
    var diff = a[1] - b[1];
    return order === "desc" ? -diff : diff;
  });
}

function sortCounterByCountAsc()  { sortCounterByCount_("asc");  }
function sortCounterByCountDesc() { sortCounterByCount_("desc"); }

// --- ヘルパー ---

// "Shibata(B2)" → "B2" を取り出す
function extractGrade_(nameStr) {
  var match = String(nameStr).match(/\(([^)]+)\)/);
  return match ? match[1] : "";
}

// "B2" → ソート用の数値（B<M、数字は昇順）
function gradeOrder_(grade) {
  var typeOrder = { "B": 0, "M": 1 };
  var type = grade.charAt(0).toUpperCase();
  var num = parseInt(grade.slice(1)) || 0;
  return (typeOrder[type] !== undefined ? typeOrder[type] : 9) * 10 + num;
}

// --- カウント加算 ---

// counterシートのカウントを加算する
function addCount(ss, name) {
  var counterSheet = ss.getSheetByName(SHEET_NAMES.COUNTER);
  if (!counterSheet) return;

  var lastRow = counterSheet.getLastRow();
  if (lastRow >= ROWS.COUNTER_DATA_START) {
    var numRows = lastRow - ROWS.COUNTER_DATA_START + 1;
    var data = counterSheet.getRange(ROWS.COUNTER_DATA_START, 1, numRows, 2).getValues();
    for (var i = 0; i < data.length; i++) {
      if (data[i][0] === name) {
        counterSheet.getRange(ROWS.COUNTER_DATA_START + i, 2).setValue(data[i][1] + 1);
        return;
      }
    }
  }

  counterSheet.getRange(lastRow + 1, 1).setValue(name);
  counterSheet.getRange(lastRow + 1, 2).setValue(1);
}
