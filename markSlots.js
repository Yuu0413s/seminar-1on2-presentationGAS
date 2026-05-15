// 金曜13:10に実行：予約者名が入っている行を緑色に変更
function markActiveSlots() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = formatDate(getFriday(new Date(), 0));
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;

    var lastRow = sheet.getLastRow();
    for (var row = 3; row <= lastRow; row++) {
        if (row >= 10 && row <= 16) continue;
        var name = sheet.getRange(row, 4).getValue();
        if (name) {
            sheet.getRange(row, 4).setBackground("#00ff00");
        }
    }
}

// 15分おきに実行：グレーかつ終了時刻を過ぎた行に「済(Done)」をつける
function checkAndMarkDone() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = formatDate(getFriday(new Date(), 0));
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;

    var now = new Date();
    var lastRow = sheet.getLastRow();

    for (var row = 3; row <= lastRow; row++) {
        if (row >= 10 && row <= 16) continue;

        var start = sheet.getRange(row, 2).getValue();
        var end = sheet.getRange(row, 3).getValue();
        if (!start || !end) continue;

        var endTime = parseTime(end);
        if (now < endTime) continue;

        var name = sheet.getRange(row, 4).getValue();
        var status = sheet.getRange(row, 5).getValue();
        var bgColor = sheet.getRange(row, 4).getBackground();

        // ✅ グレー(#999999)＝学生が1on1終了の合図を出した行のみ済みにする
        if (name && bgColor === "#999999" && status !== "済(Done)" && status !== "対応不可") {
            sheet.getRange(row, 5).setValue("済(Done)");
            addCount(ss, name);
        }
    }
}