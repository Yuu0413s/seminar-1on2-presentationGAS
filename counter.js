// スプレッドシートを開いたときにメニューを追加する
function onOpen() {
    SpreadsheetApp.getActiveSpreadsheet()
        .addMenu("1on2管理", [
            { name: "名前順でソート", functionName: "sortCounterByName" },
            { name: "学年順でソート（昇順: B1→M2）", functionName: "sortCounterByGradeAsc" },
            { name: "学年順でソート（降順: M2→B1）", functionName: "sortCounterByGradeDesc" },
            { name: "発表回数順でソート（昇順: 少ない順）", functionName: "sortCounterByCountAsc" },
            { name: "発表回数順でソート（降順: 多い順）", functionName: "sortCounterByCountDesc" }
        ]);
}

// counterシートを名前のアルファベット順でソートする
function sortCounterByName() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ARCHIVE_SHEET_PREFIX);
    if (!sheet) return;
    var lastRow = sheet.getLastRow();
    if (lastRow < 3) return;
    var range = sheet.getRange(3, 1, lastRow - 2, sheet.getLastColumn());
    var data = range.getValues();
    data.sort(function(a, b) {
        return a[0].toString().localeCompare(b[0].toString(), "ja");
    });
    range.setValues(data);
}

// counterシートを学年順でソートする共通処理（asc: 昇順, desc: 降順）
function sortCounterByGrade(order) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ARCHIVE_SHEET_PREFIX);
    if (!sheet) return;
    var lastRow = sheet.getLastRow();
    if (lastRow < 3) return;
    var range = sheet.getRange(3, 1, lastRow - 2, sheet.getLastColumn());
    var data = range.getValues();
    data.sort(function(a, b) {
        var diff = gradeOrder(extractGrade(a[0])) - gradeOrder(extractGrade(b[0]));
        return order === "desc" ? -diff : diff;
    });
    range.setValues(data);
}

function sortCounterByGradeAsc()  { sortCounterByGrade("asc");  }
function sortCounterByGradeDesc() { sortCounterByGrade("desc"); }

// counterシートを発表回数順でソートする共通処理（asc: 昇順, desc: 降順）
function sortCounterByCount(order) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ARCHIVE_SHEET_PREFIX);
    if (!sheet) return;
    var lastRow = sheet.getLastRow();
    if (lastRow < 3) return;
    var range = sheet.getRange(3, 1, lastRow - 2, sheet.getLastColumn());
    var data = range.getValues();
    data.sort(function(a, b) {
        var diff = a[1] - b[1];
        return order === "desc" ? -diff : diff;
    });
    range.setValues(data);
}

function sortCounterByCountAsc()  { sortCounterByCount("asc");  }
function sortCounterByCountDesc() { sortCounterByCount("desc"); }

// "Shibata(B2)" → "B2" を取り出す
function extractGrade(nameStr) {
    var match = String(nameStr).match(/\(([^)]+)\)/);
    return match ? match[1] : "";
}

// "B2" → ソート用の数値（B<M<D、数字は昇順）
function gradeOrder(grade) {
    var typeOrder = { "B": 0, "M": 1 };
    var type = grade.charAt(0).toUpperCase();
    var num = parseInt(grade.slice(1)) || 0;
    return (typeOrder[type] !== undefined ? typeOrder[type] : 9) * 10 + num;
}

// counterシートのカウントを加算する
function addCount(ss, name) {
    var counterSheet = ss.getSheetByName("counter");
    if (!counterSheet) return;

    var lastRow = counterSheet.getLastRow();
    for (var row = 2; row <= lastRow; row++) {
        var existingName = counterSheet.getRange(row, 1).getValue();
        if (existingName === name) {
            var count = counterSheet.getRange(row, 2).getValue();
            counterSheet.getRange(row, 2).setValue(count + 1);
            return;
        }
    }
    counterSheet.getRange(lastRow + 1, 1).setValue(name);
    counterSheet.getRange(lastRow + 1, 2).setValue(1);
}